<template>
  <div class="main-container content">
      <div class="title">
        {{ $t('text.prescriptions.doctor-title') }}
      </div>
      <form>
        <div class="tb-container">
          <div class="first-tb label-tb">
            {{ $t('labels.patientAddress') }}:
          </div>
          <b-form-group class="form-control-no-modal second-tb"
            :invalid-feedback="errPatientAddr"
            :state="newPatientState"
          >
          <b-form-input list="patient-prescription" v-model="newPatient"></b-form-input>
          <datalist id="patient-prescription">
            <option v-for="patient in patients" v-bind:key="patient.address">{{ patient.name }} - {{ patient.address }}</option>
          </datalist>
          </b-form-group>
          <div class="third-tb">
            <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add medicine" label="name" track-by="code" :options="medicines" :multiple="true"></multiselect>
          </div>
          <b-button size="md" class="fourt-tb btn-tb" variant="primary" @click="newPrescription">
          {{ $t('buttons.create') }}
          </b-button>
        </div>
      </form>
    </div>

<!-- TODO: andd in languages -->
    
</template>

<script>
/* eslint-disable */
import web3 from "../web3/web3";
import '../assets/css/prescriptions.css';
import patientsData from '../data/patients.json';
import Multiselect from 'vue-multiselect';
import MedicinesABI from '../web3/medicinesABI';

export default {
  name: 'PrescriptionsDoctor',
  props: {
    msg: String,
  },
  components: {
    Multiselect
  },
  data() {
    return {
      newPatient: '',
      newPatientState: null,
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      patients: patientsData,
      value: [],
      medicines: []
    };
  },
  methods: {
    async newPrescription() {

    }
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
