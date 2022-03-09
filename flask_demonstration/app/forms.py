from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class InputForm(FlaskForm):
    inp1 = StringField('input1', validators=[DataRequired()])
    inp2 = StringField('input1', validators=[DataRequired()])
    inp3 = StringField('input1', validators=[DataRequired()])
    submit = SubmitField('Bereken de uitkomst')