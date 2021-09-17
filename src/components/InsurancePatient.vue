<template>
  <div class="box">
    <form>
      <div class="is-flex is-justify-content-space-between">
        <h1 class="title">
          {{ $t('text.insurance.title-patient') }}
        </h1>
        <button type="submit"
          class="button is-info"
          @click="sendToDoctor">
          <b-icon icon="magic"/>
          <strong>{{ $t('buttons.send') }}</strong>
        </button>
      </div>

      <b-field :label="lblDoctorAddress">
        <div>
          <b-input
            list="doctor-address"
            v-model="newDoctor"
            :placeholder="lblDropDownPlaceholder"
            :invalid-feedback="errDoctorAddr"
            :state="newDoctorState">
          </b-input>
          <datalist id="doctor-address">
            <option
              v-for="doctor in doctors"
              v-bind:key="doctor.address">{{ doctor.name }} - {{ doctor.address }}
            </option>
          </datalist>
        </div>
      </b-field>

      <b-field :label="lblAmount">
        <b-input v-model="insuranceAmmount" :placeholder="lblNumber" type="number" min="0"/>
      </b-field>
      <a :href="transactionURL">{{ transactionURL }}</a>   
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import web3 from "../web3/web3";
import InsuranceABI from '../web3/insuranceABI';
import doctorsData from '../data/doctors.json';

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
      lblAmount: this.$i18n.t('labels.amount'),
      lblDoctorAddress: this.$i18n.t('labels.doctorAddress'),
      lblNumber: this.$i18n.t('labels.number'),
      lblDropDownPlaceholder: this.$i18n.t('labels.dropDownPlaceholder'),
      insuranceAmmount: '',
      transactionURL: '',
      doctors: doctorsData,
    };
  },
  methods: {
    async sendToDoctor() {
      const amount = web3.utils.toWei(this.insuranceAmmount);
      const doctor = this.newDoctor.split(' - ')[1];
      try {
        const res = await InsuranceABI.getContract().methods.transfer(doctor, amount).send({ from: web3.currentProvider.selectedAddress });
        this.transactionURL =  `https://ropsten.etherscan.io/tx/${res.transactionHash}`;
        // console.log(res.transactionHash);
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
    }
  }
};
</script>
