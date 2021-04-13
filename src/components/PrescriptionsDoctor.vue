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
            <b-form-input list="my-list-id" v-model="newPatient"></b-form-input>
            <datalist id="my-list-id">
              <option v-for="patient in patients" v-bind:key="patient.address">{{ patient.name }} - {{ patient.address }}</option>
            </datalist>
          </b-form-group>
          <b-button size="md" class="third-tb btn-tb" variant="primary" @click="newPrescription()">
          {{ $t('buttons.create') }}
          </b-button>
        </div>
      </form>
    </div>

<!-- TODO: andd in languages -->
    
</template>

<script>
// import web3 from "../web3/web3";
// import abi from '../web3/prescriptionsABI';
import '../assets/css/prescriptions.css';

export default {
  name: 'PrescriptionsDoctor',
  props: {
    msg: String,
  },
  data() {
    return {
      newPatient: '',
      newPatientState: null,
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      patients: [{name: "Patient 1", address: "0x111"}, {name: "Patient 2", address: "0x222"}, {name: "Patient 3", address: "0x333"}], // TODO: change after
    };
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
};
</script>
