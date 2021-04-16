<template>
  <div class="main-container content">
    <p v-if="prescriptions.length == 0" class="no-prescriptions">
      {{ $t('text.prescriptions.noPrescription') }}
    </p>
    <b-table
      v-else
      class="main-table-style table-prescriptions"
      striped
      hover
      :items="prescriptions"
      :fields="fields"
    >
      <template #cell(send)="row">
        <!-- <b-button v-if="row.item.send" TODO: change it after with that-->
        <b-button
          v-if="!row.item.send"
          v-b-modal="'prescription-send'"
          size="sm"
          variant="primary"
          class="btn-table"
        >
          {{ $t('buttons.send') }}
        </b-button>
        <!-- TODO: finish after -->
        <!-- <b-button v-else-if="!row.item.send" size="sm" variant="danger" @click="openSend()" class="btn-table">
          Revert
        </b-button>
        <span else>
          Executed
        </span> -->
      </template>
    </b-table>
    <PrescriptionSend />
  </div>
</template>

<script>
/* eslint-disable */
// import web3 from "../web3/web3";
// import abi from '../web3/prescriptionsABI';
import patientsData from '../data/patients.json';
import '../assets/css/prescriptions.css';
import PrescriptionSend from './PrescriptionSend.vue';
import PrescriptionsABI from '../web3/prescriptionsABI';

export default {
  name: 'PrescriptionsPatient',
  props: {
    msg: String,
  },
  data() {
    return {
      newPatient: '',
      newPatientState: null,
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      fields: ['prescriptions', 'medicines', 'expiration_Date', 'send'],
      patients: patientsData,
      prescriptions: [],
    };
  },
  components: {
    PrescriptionSend,
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
  methods: {
    async getPrescriptions() {
      const prescriptions = [];
      //await PrescriptionsABI.getContract().methods.createInsurance(amount, patient).send({ from: web3.currentProvider.selectedAddress });

      // tokenId = await prescriptionInstance.tokenOfOwnerByIndex(patient, 0);
      // await prescriptionInstance.ownerOf(tokenId);
      prescriptions.push({
        prescriptions: 'TODO:',
      });
      this.prescriptions = prescriptions;
    },
  },
  async created() {
    this.patientAddress = 'Patient Address';
    await this.getPrescriptions();
  },
};
</script>
