from flask import *
from StatFuncs import *
#import pandas as pd

app = Flask(__name__)

@app.route('/',methods=['GET'])
def root():
	return render_template('index.html', message = "Flask")

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

if __name__ == '__main__':
    app.run(debug=False)