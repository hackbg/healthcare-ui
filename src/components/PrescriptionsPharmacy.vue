<template>
  <div class="main-container content">

    <div class="title">
      {{ $t('text.pharmacy.title1') }}
    </div>

    <input v-model="prescriptionsTokenId" :placeholder="prescriptionsTokenIdLbl" class="simple-input third-tb"/>
    <b-button class="fourt-tb btn-tb" size="md" variant="primary" @click="recievedPrescription">
      {{ $t('buttons.send') }}
    </b-button>

    <div class="title">
      {{ $t('text.pharmacy.title2') }}
    </div>

    <p v-if="prescriptionsFulfilled.length === 0" class="no-prescriptions"> <!-- TODO: change it after with equal -->
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
import Vue from 'vue';
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
    async recievedPrescription() {
      const account = window.web3.currentProvider.selectedAddress;
      const address = await PrescriptionsABI.getContract().methods.ownerOf(this.prescriptionsTokenId).call();
      console.log(address);
      const approved = await PrescriptionsABI.getContract().methods.getApproved(this.prescriptionsTokenId).call()
      console.log(approved);
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

    async getUnfulfilledPrescriptions() { // TODO:
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
        prescriptions: 'TODO: 1',
        medicines: 'analgin',
        expiration_Date: '02.11.2022',
      });
      this.prescriptionsWaiting = prescriptions; // TODO: uncoment after
    },

    // async getFulfilledPrescriptions() { // TODO:
    //   const prescriptions = [];
    //   // await PrescriptionsABI.getContract().methods.createInsurance(amount, patient).send({ from: web3.currentProvider.selectedAddress });

    //   // tokenId = await prescriptionInstance.tokenOfOwnerByIndex(patient, 0);
    //   // await prescriptionInstance.ownerOf(tokenId);
    //   // let tokenId;
    //   const account = window.web3.currentProvider.selectedAddress;
    //   console.log('pharmacy address');
    //   console.log(account);
    //   console.log('prescriptions');
    //   // const accPrescriptions = await PrescriptionsABI.getContract().methods.balanceOf(account).call();
    //   // console.log(accPrescriptions);
    //   // for(let i = 0; i <= accPrescriptions; i++) {
    //   //   tokenId = await PrescriptionsABI.getContract().methods.tokenOfOwnerByIndex(account, i).call();
    //   //   console.log(tokenId);
    //   // }

    //   prescriptions.push({
    //     prescriptions: 'TODO:',
    //     medicines: 'aspirin',
    //     expiration_Date: '01.01.2022',
    //   });
    //   this.prescriptionsFulfilled = prescriptions; // TODO: uncoment after
    // },

    sendPrescription(prescription) {
      console.log('prescription');
      console.log(prescription);
      Vue.$toast.open({
          message: 'TODO:!!!',
          type: 'success',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
    }
  },

  async created() {
    this.patientAddress = 'Patient Address';
    await this.getFulfilledPrescriptions();
    await this.getUnfulfilledPrescriptions();
  },
};
</script>
