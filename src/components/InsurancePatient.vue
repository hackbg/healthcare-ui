<template>
  <div>
    <div class="box">
      <form v-on:submit.prevent="sendToDoctor">
        <div class="is-flex is-justify-content-space-between">
          <div class="title">
            {{ $t('text.insurance.title-patient') }}
          </div>
          <button type="submit" class="button is-info">
            <b-icon icon="magic" />
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
              :state="newDoctorState"
              required
              minlength="4"
            >
            </b-input>
            <datalist class="dr-address" id="doctor-address">
              <option v-for="doctor in doctors" v-bind:key="doctor.address">
                {{ doctor.name }} - {{ doctor.address }}
              </option>
            </datalist>
          </div>
        </b-field>

        <b-field :label="lblAmount">
          <b-input
            v-model="insuranceAmmount"
            :placeholder="lblNumber"
            required
            type="number"
            min="0"
          />
        </b-field>
      </form>
    </div>
    <div class="is-flex is-justify-content-space-between">
      <span class="transaction-lbl-url title">{{ lblTransaction }}</span>
      <a target="_blank" :href="transactionURL" class="transaction-lbl-url title">{{ transactionURL }}</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
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
      failSendTransaction: this.$i18n.t('errors.err-transaction-send'),
      sentTransaction: this.$i18n.t('dialogs.messages.sentTransaction'),
      lblAmount: this.$i18n.t('labels.amount'),
      lblDoctorAddress: this.$i18n.t('labels.doctorAddress'),
      lblNumber: this.$i18n.t('labels.number'),
      lblDropDownPlaceholder: this.$i18n.t('labels.dropDownPlaceholder'),
      lblTransaction: '',
      insuranceAmmount: '',
      transactionURL: '',
      doctors: doctorsData,
    };
  },
  methods: {
    async sendToDoctor() {
      const amount = this.$store.state.web3.utils.toWei(this.insuranceAmmount);
      const doctor = this.newDoctor.split(' - ')[1];
      try {
        const insuranceAmmount = this.insuranceAmmount;
        InsuranceABI.getContract()
          .methods.transfer(doctor, amount)
          .send(
            {from: this.$store.state.web3.currentProvider.selectedAddress},
            async (error, transactionHash) => {
              if (error) {
                Vue.$toast.open({
                  message: this.failSendTransaction,
                  type: 'error',
                  duration: 3000,
                  pauseOnHover: true,
                  position: 'top-right',
                });
                return;
              }
              this.transactionURL = `https://ropsten.etherscan.io/tx/${transactionHash}`;
              this.lblTransaction = this.$i18n.t('labels.transactionUrl');

              this.newDoctor = '';
              this.insuranceAmmount = '';

              Vue.$toast.open({
                message: this.sentTransaction,
                type: 'success',
                duration: 3000,
                pauseOnHover: true,
                position: 'top-right',
              });
              const pendingTxHashes = this.$store.state.pendingTxHashes;
              pendingTxHashes.push({
                tx: transactionHash,
                msg: this.$i18n.t('labels.createdInsurance') + insuranceAmmount,
              });
              this.$store.commit('pendingTxHashes', pendingTxHashes);
            }
          );
      } catch (ex) {
        Vue.$toast.open({
          message: ex,
          type: 'error',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
      }
    },
  },
};
</script>

<style scoped>
 .dr-address {
   background-color: hotpink !important;
 }
</style>