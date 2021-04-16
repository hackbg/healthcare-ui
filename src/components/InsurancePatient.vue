<template>
  <div class="main-container content">
    <div class="title">
      {{ $t('text.insurance.title-patient') }}
    </div>
    <form>
      <div class="tb-container">
        <div class="first-tb label-tb">
          {{ $t('labels.doctorAddress') }}:
        </div>
        <b-form-group class="form-control-no-modal second-tb"
            :invalid-feedback="errDoctorAddr"
            :state="newDoctorState"
          >
          <b-form-input list="doctor-address" v-model="newDoctor"></b-form-input>
          <datalist id="doctor-address">
            <option v-for="doctor in doctors" v-bind:key="doctor.address">{{ doctor.name }} - {{ doctor.address }}</option>
          </datalist>
        </b-form-group>
        <input v-model="insuranceAmmount" :placeholder="amountLbl" class="simple-input third-tb"/>
        <b-button class="fourt-tb btn-tb" size="md" variant="primary" @click="sendToDoctor">
          {{ $t('buttons.send') }}
        </b-button>
      </div>
    </form>
    <b-link :href="transactionURL">{{ transactionURL }}</b-link>   
  </div>
</template>

<script>
import web3 from "../web3/web3";
import InsuranceABI from '../web3/insuranceABI';

export default {
  name: 'InsurancePatient',
  props: {
    msg: String,
  },
  data() {
    return {
      newDoctor: '',
      newDoctorState: null,
      errDoctorAddr: this.$i18n.t('errors.err-doctor-address'),
      amountLbl: this.$i18n.t('labels.amount'),
      insuranceAmmount: '',
      transactionURL: '',
      doctors: [{name: "Doctor 1", address: "0x047012d0BEed73E5efA757274d327915cD1522f8"}, {name: "Doctor 2", address: "0x222"}, {name: "Doctor 3", address: "0x333"}] // TODO: change after
    };
  },
  methods: {
    async sendToDoctor() {
      const amount = web3.utils.toWei(this.insuranceAmmount);
      const doctor = this.newDoctor.split(' - ')[1];
      try {
        const res = await InsuranceABI.getContract().methods.transfer(doctor, amount).send({ from: web3.currentProvider.selectedAddress });
        this.transactionURL =  `https://ropsten.etherscan.io/tx/${res.transactionHash}`;
        console.log(res.transactionHash);
      }
      catch(ex) {
        console.log(ex); // TODO: label or toast
      }
    }
  }
};
</script>
