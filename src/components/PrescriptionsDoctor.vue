<template>
  <div class="box">
    <form>
      <div class="is-flex is-justify-content-space-between">
        <h1 class="title">
          {{ $t('text.prescriptions.doctor-title') }}
        </h1>
        <button
          type="submit"
          class="button is-info"
          @click="newPrescription">
            <b-icon icon="magic"/>
            <strong>{{ $t('buttons.create') }}</strong>
        </button>
      </div>

      <b-field :label="lblPatientAddress">
        <div>
          <b-input
            list="patient-prescription"
            v-model="newPatient"
            :placeholder="lblDropDownPlaceholder"
            :invalid-feedback="errPatientAddr"
            :state="newPatientState"
          >
          </b-input>
          <datalist id="patient-prescription">
            <option
              v-for="patient in patients"
              v-bind:key="patient.address">{{ patient.name }} - {{ patient.address }}
            </option>
          </datalist>
        </div>
      </b-field>

      <b-field :label="lblMedicines">
        <multiselect
          v-model="value"
          tag-placeholder="Add this as new tag"
          :placeholder="lblAddMedicine" label="name"
          track-by="code"
          :options="medicines"
          :multiple="true">
        </multiselect>
      </b-field>

      <b-field :label="lblExpirationDate">
       <b-datepicker
          v-model="closing"
          icon="calendar"
          :placeholder="lblDropDownPlaceholder"
          horizontal-time-picker
          rounded
          required
          :min-date="min"
          :date-parser="getTimestamp" :v-model="selectedDate"
        ></b-datepicker>
      </b-field>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
import web3 from "../web3/web3";
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
      lblAddMedicine: this.$i18n.t('labels.add-medicine'),
      lblPatientAddress: this.$i18n.t('labels.patientAddress'),
      lblMedicines: this.$i18n.t('labels.medicines'),
      lblExpirationDate: this.$i18n.t('labels.expiration-date'),
      lblDropDownPlaceholder: this.$i18n.t('labels.dropDownPlaceholder'),
      patients: patientsData,
      context: null,
      value: [],
      medicines: [],
      selectedDate: null,
      min: minDate,
      closing: null,
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
        const msg = this.$i18n.t('dialogs.messages.select-valid-medicine');
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

    // onContext(ctx) {
    //   console.log('context'); //TODO:
    //   this.context = ctx;
    //   this.selectedDate = Math.ceil(new Date(ctx.activeDate) - new Date()/1000) + 24*60*60; //TODO: check the math
    // },
    getTimestamp(date) {
      return Math.ceil(new Date(ctx.activeDate) - new Date()/1000) + 24*60*60; //TODO: check the math
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
