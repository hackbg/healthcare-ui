<template>
  <div>
    <div class="box">
      <form v-on:submit.prevent="newPrescription">
        <div class="is-flex is-justify-content-space-between">
          <h1 class="title">
            {{ $t('text.prescriptions.doctor-title') }}
          </h1>
          <button type="submit" class="button is-info">
            <b-icon icon="magic" />
            <strong>{{ $t('buttons.create') }}</strong>
          </button>
        </div>

        <b-field :label="lblPatientAddress">
          <b-autocomplete
            required
            :open-on-focus="true"
            v-model="newPatient"
            :data="patientsList"
            :placeholder="lblDropDownPlaceholder"
            :invalid-feedback="errPatientAddr"
            :clearable="true"
          >
          </b-autocomplete>
        </b-field>

<!-- TODO: with that options in the field down can add msg wit error type="is-danger"
            message="Something went wrong with this field" -->
        <b-field :label="lblMedicines">
          <multiselect
            v-model="value"
            tag-placeholder="Add this as new tag"
            :placeholder="lblAddMedicine"
            label="name"
            track-by="code"
            :options="medicines"
            :multiple="true"
          >
          </multiselect>
        </b-field>

        <b-field :label="lblExpirationDate">
          <b-datepicker
            v-model="selectedDate"
            icon="calendar"
            :placeholder="lblDropDownPlaceholder"
            horizontal-time-picker
            rounded
            required
            :min-date="min"
          ></b-datepicker>
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
/* eslint-disable */
import Vue from 'vue';
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
    Multiselect,
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
      failSendTransaction: this.$i18n.t('errors.err-transaction-send'),
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
      lblTransaction: '',
      transactionURL: '',
      magicDateNumber: 24 * 60 * 60, //TODO: check the math
    };
  },
  methods: {
    async newPrescription() {
      const patient = this.newPatient.split(' - ')[1];
      const prescriptionMeds = this.value.map((v) => v.name);

      // if (patient === undefined) {
      //   const msg = this.$i18n.t('dialogs.messages.select-valid-patient-addr');
      //   Vue.$toast.open({
      //     message: msg,
      //     type: 'error',
      //     duration: 3000,
      //     pauseOnHover: true,
      //     position: 'top-right',
      //   });
      //   return;
      // } else if (prescriptionMeds.length === 0) {
      //   const msg = this.$i18n.t('dialogs.messages.select-valid-medicine');
      //   Vue.$toast.open({
      //     message: msg,
      //     type: 'error',
      //     duration: 3000,
      //     pauseOnHover: true,
      //     position: 'top-right',
      //   });
      //   return;
      // } else if (this.selectedDate === null) {
      //   console.log('debug date');
      //   console.log(this.selectedDate);
      //   //TODO: add validation for this.selectedDate <= date.now
      //   const msg = this.$i18n.t('dialogs.messages.select-valid-date');
      //   Vue.$toast.open({
      //     message: msg,
      //     type: 'error',
      //     duration: 3000,
      //     pauseOnHover: true,
      //     position: 'top-right',
      //   });
      //   return;
      // }

      try {
        // PrescriptionsABI.getContract()
        //   .methods.createPrescription(prescriptionMeds.join(','), patient, this.selectedDate)
        const date = Math.ceil((new Date(this.selectedDate) - new Date()) / 1000) + this.magicDateNumber;
        console.log(this.selectedDate)
        console.log(date);
        PrescriptionsABI.getContract()
          .methods.createPrescription(prescriptionMeds.join(','), patient, date)
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
              transactionHash = `transaction hash: ${transactionHash}`;

              this.newPatient = '';
              this.value = [];
              this.selectedDate = null;

              Vue.$toast.open({
                message: transactionHash,
                type: 'success',
                duration: 3000,
                pauseOnHover: true,
                position: 'top-right',
              });
              const pendingTxHashes = this.$store.state.pendingTxHashes;
              pendingTxHashes.push({
                tx: transactionHash,
                msg: this.$i18n.t('labels.createdPrescription'),
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
    patientsList() {
      return this.patients.map(patient => `${patient.name} - ${patient.address}`);
    },
  },
  async created() {
     const count = await MedicinesABI.getContract().methods.medicinesCount().call({from: this.$store.state.web3.currentProvider.selectedAddress});

    for (let i = 0; i < count; i++) {
      const medicine = await MedicinesABI.getContract().methods.medicines(i).call();
      const option = {name: medicine, code: i, value: i};
      this.medicines.push(option);
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
