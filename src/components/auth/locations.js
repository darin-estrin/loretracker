import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, Paper, List, ListItem }  from 'material-ui';
import { grey900 } from 'material-ui/styles/colors';
import { addLocation, getCampaignData } from '../../actions'
import CampaignNav from './campaign_nav';
import * as styles from '../../css/material_styles';

class Locations extends Component {
  componentWillMount() {
    const { type, id } = this.props.params;
    this.props.getCampaignData(id, type);
  }

  addLocationSubmit = ({ name,  image, history, description }) => {
    const { id } = this.props.params;
    this.props.addLocation({ name, image, id, history, description});
    this.props.reset();
  }

  renderField({
    input,
    label,
    meta: {touched, error },
    ...custom
  }) {
    return(
      <TextField
          hintText={label}
          hintStyle={{color:grey900}}
          floatingLabelText={label}
          floatingLabelFocusStyle={{color:'#0097A7'}}
          underlineStyle={styles.styles.underlineStyle}
          floatingLabelStyle={styles.styles.floatingLabelStyle}
          errorText={touched && error}
          fullWidth
          inputStyle={{color:grey900}}
          {...input}
          {...custom}
      />
    );
  }

  renderAddLocation() {
    const { handleSubmit } = this.props;
    if (this.props.params.type === 'dm') {
      return (
        <form onSubmit={handleSubmit(this.addLocationSubmit)}>
          <div>
            <Field label='Location Name' name='name' component={this.renderField} />
          </div>
          <div>
            <Field label='Description' name='description' component={this.renderField} />
          </div>
          <div>
            <Field label='History' name='history' component={this.renderField} />
          </div>
          <div>
            <Field label='Link to image' name='image' component={this.renderField} />
          </div>
          {this.renderAlert()}
          <RaisedButton type='submit' label='Add Location' />
          <Link to='/campaigns'>
            <RaisedButton style={styles.buttonStyle} label='Back to Campaigns' 
              secondary={true}
            />
          </Link>
        </form>
      );
    }
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className='alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      )
    }
  }

  renderLocations() {
    const { campaign, params:{ type, id }}  = this.props;
    if (!campaign) { return; }
    const locations = campaign.locations
    if (type === 'pc' && locations.length < 1) {
      return (
        <h2 className='notes-header'>No locations have been shared with you yet</h2>
      );
    }
    return locations.map(function(object){
      return (
        <Link to={`/campaigns/${type}/${id}/locations/${object.name}`} key={object._id}>
          <ListItem style={styles.listItemStyle} primaryText={object.name} 
            secondaryText={!object.description ? '' : object.description}
          />
        </Link>
      );
    });
   }

  render() {
    return (
      <div>
        <CampaignNav index={2} />
        <div className='container'>
          <Paper style={styles.paperStyle}>
            {!this.props.campaign ? '' : <h2>{this.props.campaign.campaignName}</h2>}
            <List style={styles.listStyle}>
            <h2 className='notes-header'>Locations</h2>
            {this.renderLocations()}
            </List>
            {this.renderAddLocation()}
          </Paper>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.name) {
    errors.name = 'Location must have a name';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    campaign: state.user.Campaign,
    errorMessage: state.user.error
  }
}

export default reduxForm({
  form: "add_location",
  validate
})(connect(mapStateToProps, { addLocation, getCampaignData})(Locations));