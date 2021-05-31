<template>
  <div class="main-container content">
      <div class="title">
        {{ $t('text.prescriptions.doctor-title') }}
      </div>
      <form>
        <div class="ps-container">
          <div class="first-ps label-tb">
            {{ $t('labels.patientAddress') }}:
          </div>
          <b-form-group class="form-control-no-modal second-ps"
            :invalid-feedback="errPatientAddr"
            :state="newPatientState"
          >
          <b-form-input list="patient-prescription" v-model="newPatient"></b-form-input>
          <datalist id="patient-prescription">
            <option v-for="patient in patients" v-bind:key="patient.address">{{ patient.name }} - {{ patient.address }}</option>
          </datalist>
          </b-form-group>
          <div class="third-ps">
            <multiselect v-model="value" class="multiselect-tb" tag-placeholder="Add this as new tag" :placeholder="addMedicineLbl" label="name" track-by="code" :options="medicines" :multiple="true"></multiselect>
          </div>
          <b-button size="md" class="fourt-ps btn-tb" variant="primary" @click="newPrescription">
          {{ $t('buttons.create') }}
          </b-button>
        </div>
      </form>
      <div class="lbl-prescription-expiration">
        {{ $t('labels.expiration-date') }}:
      </div>
      <div class="date-time-picker">
        <b-calendar @context="onContext" :min="min" locale="en-UK" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-calendar>
      </div>
    </div>

<!-- TODO: add in languages -->
    
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
import web3 from "../web3/web3";
import '../assets/css/prescriptions.css';
import patientsData from '../data/patients.json';
import Multiselect from 'vue-multiselect';
import MedicinesABI from '../web3/medicinesABI';
import PrescriptionsABI from '../web3/prescriptionsABI';

export default {
  name: 'PrescriptionsDoctor',
  props: {
    msg: String,
  },
  components: {
    Multiselect
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today + 1);
    minDate.setMonth(minDate.getMonth());
    minDate.setDate(now.getDate() + 1);

    return {
      newPatient: '',
      newPatientState: null,
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      addMedicineLbl: this.$i18n.t('labels.add-medicine'),
      patients: patientsData,
      context: null,
      value: [],
      medicines: [],
      selectedDate: null,
      min: minDate
    };
  },
  methods: {
    async newPrescription() {
      const patient = this.newPatient.split(' - ')[1];
      const prescriptionMeds = this.value.map(v => v.name);

      if(patient === undefined) {
        const msg = this.$i18n.t('dialogs.messages.select-valid-patient-addr');
        Vue.$toast.open({
          message: msg,
          type: 'error',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
        return;
      }
      else if(prescriptionMeds.length === 0) {
        const msg = this.$i18n.t('dialogs.messages.select-valid-prescription');
        Vue.$toast.open({
          message: msg,
          type: 'error',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
        return;
      }
      else if(this.selectedDate === null) { //TODO: add validation for this.selectedDate <= date.now
        const msg = this.$i18n.t('dialogs.messages.select-valid-date');
        Vue.$toast.open({
          message: msg,
          type: 'error',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
        return;
      }

      try {
        const res = await PrescriptionsABI.getContract().methods.createPrescription(prescriptionMeds.join(','), patient, this.selectedDate).send({ from: web3.currentProvider.selectedAddress });
        this.transactionURL =  `https://ropsten.etherscan.io/tx/${res.transactionHash}`;
        const transactionHash = `transaction hash: ${res.transactionHash}`;
        Vue.$toast.open({
          message: transactionHash,
          type: 'success',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
      }
      catch(ex) {
        Vue.$toast.open({
          message: ex,
          type: 'error',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
      }
    },

    onContext(ctx) {
      console.log('context'); //TODO: 
      console.log(this.context = ctx);
      console.log('selecteddate:');
      console.log(new Date(ctx.activeDate) - new Date());
      this.selectedDate = Math.ceil(new Date(ctx.activeDate) - new Date()/1000) + 24*60*60; //TODO: check the math
      console.log(this.selectedDate);
    },

  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
  async created() {
    const count = await MedicinesABI.getContract().methods.medicinesCount.call()._method.outputs.length;
    for(let i = 0; i <= count; i++) {
      const medicine = await MedicinesABI.getContract().methods.medicines(i).call();
      const option = { name: medicine, code: i, value: i };
      this.medicines.push(option);
    }
  }
  
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
