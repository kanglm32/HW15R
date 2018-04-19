import pandas as pd
import numpy as np
import os
import csv
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
from flask import Flask, render_template, jsonify



engine = create_engine("sqlite:///belly_button_biodiversity.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)

otu = Base.classes.otu
samples = Base.classes.samples
samples_metadata = Base.classes.samples_metadata
inspector = inspect(engine)
session = Session(engine)

app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return render_template("index.html")

@app.route("/names")
def names():
    
    columns = inspector.get_columns('samples')
    all_names = [column["name"] for column in columns]
    all_names.pop(0)
    return jsonify(all_names)

@app.route('/otu')
def otus():
    results = session.query(otu.lowest_taxonomic_unit_found).all()
    # all_found = [result[0] for result in results]
    all_found = list(np.ravel(results))
    return jsonify(all_found)


@app.route('/metadata/<sample>')
def metasample(sample):
    sample_dict = {}
    samplecut = sample.replace("BB_", "").lower()
    for user in session.query(samples_metadata).filter_by(SAMPLEID=samplecut):
        sample_dict["AGE"] = user.AGE
        sample_dict["BBTYPE"] = user.BBTYPE
        sample_dict["ETHNICITY"] = user.ETHNICITY
        sample_dict["GENDER"] = user.GENDER
        sample_dict["LOCATION"] = user.LOCATION
        sample_dict["SAMPLEID"] = user.SAMPLEID
    return jsonify(sample_dict)

@app.route('/wfreq/<sample>')
def wfreq(sample):
    samplecut = sample.replace("BB_", "").lower()
    for user in session.query(samples_metadata.WFREQ).filter_by(SAMPLEID=samplecut):
        wfreq_l = user[0]
    return jsonify(wfreq_l)

@app.route('/samples/<sample>')
def sampleapp(sample):
        df = pd.read_csv('belly_button_biodiversity_samples.csv')
        # df = pd.read_sql(session.query(samples).statement, session.query(samples).session.bind)
        df2 = df[["otu_id", sample]]
        df2 = df2.loc[df2[sample] > 0]
        df2 = df2.sort_values(by=sample, ascending=False) 
        df3 = df2.head(10)
        # otu_id = list(df3['otu_id'])
        # sample_values = list(df3[sample])
        # item = {"otu_ids":otu_id, "sample_values": sample_values, "type": "pie"}
        item =df3.to_dict('list')
        item["type"] = "pie"
        item["labels"] = item.pop("otu_id")
        item["values"] = item.pop(sample)
        data = [item]

        return jsonify(data)


if __name__ == '__main__':
    app.run()