<template>
  <div class="main-container content">
    <div class="title">
    TODO: Filfuled prescriptions
    </div>

    <p v-if="prescriptions.length !== 0" class="no-prescriptions"> <!-- TODO: change it after with equal -->
      {{ $t('text.prescriptions.noPrescription') }}
    </p>
    <div v-else>
      <b-button @click="getFulfilledPrescriptions">Test</b-button>
    <b-table
      class="main-table-style table-prescriptions"
      striped
      hover
      :items="prescriptions"
      :fields="fields"
    >
    </b-table>
    </div>

  </div>
</template>

<script>
import patientsData from '../data/patients.json'; // TODO: maybe delete it after
import '../assets/css/prescriptions.css';
// import PrescriptionsABI from '../web3/prescriptionsABI';

export default {
  name: 'PrescriptionsPharmacy',
  props: {
    msg: String,
  },
  data() {
    return {
      newPatient: '',
      newPatientState: null,
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      fields: ['prescriptions', 'medicines', 'expiration_Date'],
      patients: patientsData,
      prescriptions: [],
    };
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
  methods: {
    async getFulfilledPrescriptions() { // TODO:
      const prescriptions = [];
      // await PrescriptionsABI.getContract().methods.createInsurance(amount, patient).send({ from: web3.currentProvider.selectedAddress });

      // tokenId = await prescriptionInstance.tokenOfOwnerByIndex(patient, 0);
      // await prescriptionInstance.ownerOf(tokenId);
      // let tokenId;
      const account = window.web3.currentProvider.selectedAddress;
      console.log('pharmacy address');
      console.log(account);
      console.log('prescriptions');
      // const accPrescriptions = await PrescriptionsABI.getContract().methods.balanceOf(account).call();
      // console.log(accPrescriptions);
      // for(let i = 0; i <= accPrescriptions; i++) {
      //   tokenId = await PrescriptionsABI.getContract().methods.tokenOfOwnerByIndex(account, i).call();
      //   console.log(tokenId);
      // }

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
