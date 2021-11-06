from flask import *
from StatFuncs import *
from flask_cors import CORS
#import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET'])
def root():
	return render_template('index.html', message = "Flask")

@app.route('/get_sr_costs',methods=['GET'])
def sr_costs():
    return get_sr_costs()

@app.route('/get_device',methods=['GET'])
def sys():
    return get_sys()

@app.route('/get_service',methods=['GET'])
def service_data():
    return get_service_plot()

@app.route('/get_service_month',methods=['GET'])
def service_month_data():
    return get_service_month()

@app.route('/get_parts',methods=['GET'])
def parts_data():
    return get_parts_counts()

@app.route('/get_sys_freqs',methods=['GET'])
def get_freqencies():
    return get_freq_sys()

@app.route('/get_ec',methods=['GET'])
def get_ec_data():
    return get_ec_stats()

@app.route('/get_total_ec',methods=['GET'])
def get_freq_used():
    return get_total_ec()

if __name__ == '__main__':
    app.run(debug=False)
