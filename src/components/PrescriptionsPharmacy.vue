<template>
  <div class="main-container content">

    <div class="title">
      {{ $t('text.pharmacy.title1') }}
    </div>

    <div class="tb-container">
      <div class="first-tb label-tb">
          {{ $t('labels.prescriptionsTokenId') }}:
        </div>
      <input v-model="prescriptionsTokenId" :placeholder="prescriptionsTokenIdLbl" class="simple-input input-main second-tb"/>
      <b-button class="third-tb btn-tb" size="md" variant="primary" @click="receivedPrescription">
        {{ $t('buttons.send') }}
      </b-button>
    </div>

    <div class="title">
      {{ $t('text.pharmacy.title2') }}
    </div>

    <p v-if="prescriptionsFulfilled.length === 0" class="no-prescriptions">
      {{ $t('text.prescriptions.noPrescription') }}
    </p>
    <div v-else>
    <b-table
      class="main-table-style table-prescriptions"
      striped
      hover
      :items="prescriptionsFulfilled"
      :fields="fields"
    >
    </b-table>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import PrescriptionsABI from '../web3/prescriptionsABI';
import '../assets/css/prescriptions.css';

export default {
  name: 'PrescriptionsPharmacy',
  props: {
    msg: String,
  },
  data() {
    return {
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      fields: ['prescriptions', 'medicines', 'expiration_Date'],
      prescriptionsFulfilled: [],
      fieldsWaiting: ['prescriptions', 'medicines', 'expiration_Date', 'accept'],
      prescriptionsWaiting: [],
      prescriptionsTokenId: null,
    };
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
  methods: {
    async receivedPrescription() {
      const account = window.web3.currentProvider.selectedAddress;
      const address = await PrescriptionsABI.getContract().methods.ownerOf(this.prescriptionsTokenId).call();
      // console.log(address);
      // const approved = await PrescriptionsABI.getContract().methods.getApproved(this.prescriptionsTokenId).call()
      // console.log(approved);
      await PrescriptionsABI.getContract().methods.transferFrom(address, account, Number(this.prescriptionsTokenId)).send({ from: account });
    },

    async getFulfilledPrescriptions() {
      const prescriptions = [];
      const account = window.web3.currentProvider.selectedAddress;
      const accPrescriptions = await PrescriptionsABI.getContract().methods.balanceOf(account).call();

      for(let i = 0; i < accPrescriptions; i++) {
        const tokenId = await PrescriptionsABI.getContract().methods.tokenOfOwnerByIndex(account, i).call();
        const medicines = await PrescriptionsABI.getContract().methods.tokenURI(tokenId).call();
        const expire = await PrescriptionsABI.getContract().methods.expire(tokenId).call();
        prescriptions.push({
          prescriptions: tokenId,
          medicines: medicines,
          expiration_Date: new Date(Number(expire)).toDateString(),
        });
      }

      this.prescriptionsFulfilled = prescriptions;
    },
  },

  async created() {
    this.patientAddress = 'Patient Address';
    await this.getFulfilledPrescriptions();
    setInterval(this.getFulfilledPrescriptions, 10000);
  },
};
</script>
