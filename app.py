from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/features')
def features():
    return render_template('features.html')

@app.route('/subscription')
def subscription():
    return render_template('subscription.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)