<template>
  <div>
    <div class="box">
      <form v-on:submit.prevent="createInsurance">
        <div class="is-flex is-justify-content-space-between">
          <div class="title">
            {{ $t('text.insurance.createInsurance') }}
          </div>
          <button type="submit" class="button is-info">
            <b-icon icon="magic" />
            <strong>{{ $t('buttons.send') }}</strong>
          </button>
        </div>

        <b-field :label="lblPatientAddress">
          <div>
            <b-input
              list="patient-address"
              v-model="newPatient"
              required
              :validation-message="msgRequired"
              :placeholder="lblDropDownPlaceholder"
              :invalid-feedback="errPatientAddr"
              :state="newPatientState"
            >
            </b-input>
            <datalist id="patient-address">
              <option class="testtest" v-for="patient in patients" v-bind:key="patient.address">
                {{ patient.name }} - {{ patient.address }}
              </option>
            </datalist>
          </div>
        </b-field>

        <b-field :label="amountLbl">
          <b-input
            required
            :validation-message="msgRequired"
            v-model="insuranceAmmount"
            :placeholder="lblNumber"
            type="number"
            min="0.01"
            step="0.01"
          />
        </b-field>
      </form>
    </div>
    <div class="is-flex is-justify-content-space-between">
      <span class="transaction-lbl-url title">{{ lblTransaction }}</span>
      <a target="_blank" :href="transactionURL" class="transaction-url title">{{ transactionURL }}</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import patientsData from '../data/patients.json';
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
      lblPatientAddress: this.$i18n.t('labels.patientAddress'),
      lblDropDownPlaceholder: this.$i18n.t('labels.dropDownPlaceholder'),
      lblNumber: this.$i18n.t('labels.number'),
      msgRequired: this.$i18n.t('errors.err-empty-field'),
      failSendTransaction: this.$i18n.t('errors.err-transaction-send'),
      sentTransaction: this.$i18n.t('dialogs.messages.sentTransaction'),
      lblTransaction: '',
      insuranceAmmount: '',
      patients: patientsData,
      transactionURL: '',
    };
  },
  methods: {
    async createInsurance() {
      const amount = this.$store.state.web3.utils.toWei(this.insuranceAmmount);
      const patient = this.newPatient.split(' - ')[1];
      try {
        const insuranceAmmount = this.insuranceAmmount;
        InsuranceABI.getContract()
          .methods.createInsurance(amount, patient)
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

              this.newPatient = '';
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
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
};
</script>
