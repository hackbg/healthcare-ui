<template>
  <div class="main-container content">
    <div class="title">
      {{ $t('text.insurance.createInsurance') }}
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
          <b-form-input list="patient-address" v-model="newPatient"></b-form-input>
          <datalist id="patient-address">
            <option v-for="patient in patients" v-bind:key="patient.address">{{ patient.name }} - {{ patient.address }}</option>
          </datalist>
        </b-form-group>
        <input v-model="insuranceAmmount" :placeholder="amountLbl" class="simple-input third-tb"/>
        <b-button class="fourt-tb btn-tb" size="md" variant="primary" @click="createInsurance">
          {{ $t('buttons.send') }}
        </b-button>
      </div>
    </form>
    <b-link :href="transactionURL">{{ transactionURL }}</b-link>
  </div>
</template>

<script>
import patientsData from '../data/patients.json';
import web3 from "../web3/web3";
import InsuranceABI from '../web3/insuranceABI';

export default {
  name: 'InsuranceInsurer',
  props: {
    msg: String,
  },
  data() {
    return {
      newPatient: '',
      newPatientState: null,
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      amountLbl: this.$i18n.t('labels.amount'),
      insuranceAmmount: '',
      patients: patientsData,
      transactionURL: ''
    };
  },
  methods: {
    async createInsurance() {
      const amount = web3.utils.toWei(this.insuranceAmmount);
      const patient = this.newPatient.split(' - ')[1];
      try {
        const res = await InsuranceABI.getContract().methods.createInsurance(amount, patient).send({ from: web3.currentProvider.selectedAddress });
        this.transactionURL =  `https://ropsten.etherscan.io/tx/${res.transactionHash}`;
        console.log(res.transactionHash);
      }
      catch(ex) {
        console.log(ex); // TODO: label or toast
      }
    }
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
};
</script>
