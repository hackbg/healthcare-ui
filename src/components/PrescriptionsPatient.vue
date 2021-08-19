<template>
  <div class="main-container content">
    <p v-if="prescriptions.length == 0" class="no-prescriptions">
      {{ $t('text.prescriptions.noPrescription') }}
    </p>
    <div v-else>
    <b-table
      class="main-table-style table-prescriptions"
      striped
      hover
      :items="prescriptions"
      :fields="fields"
    >
      <template #cell(send)="row">
        <b-button
          v-if="!row.item.send"
          @click="selectedId = row.item.prescriptions"
          v-b-modal="'prescription-send'"
          size="sm"
          variant="primary"
          class="btn-table"
        >
          {{ $t('buttons.send') }}
        </b-button>
        <!-- TODO: finish after -->
        <b-button v-else size="sm" variant="danger" @click="revertSend(row.item.prescriptions)" class="btn-table">
          Revert
        </b-button>
        <!-- <span else>
          Executed
        </span> -->
      </template>
    </b-table>
    </div>
    <PrescriptionSend :tokenID="selectedId"/>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
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
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      fields: ['prescriptions', 'medicines', 'expiration_Date', 'send'],
      prescriptions: [],
      selectedId: '',
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
      const account = window.web3.currentProvider.selectedAddress;
      const accPrescriptions = await PrescriptionsABI.getContract().methods.balanceOf(account).call();
      for(let i = 0; i < accPrescriptions; i++) {
        const tokenId = await PrescriptionsABI.getContract().methods.tokenOfOwnerByIndex(account, i).call();
        const medicines = await PrescriptionsABI.getContract().methods.tokenURI(tokenId).call();
        const expire = await PrescriptionsABI.getContract().methods.expire(tokenId).call();
        const send = await PrescriptionsABI.getContract().methods.getApproved(tokenId).call() !== "0x0000000000000000000000000000000000000000";
        console.log(send);
        prescriptions.push({
          prescriptions: tokenId,
          medicines: medicines,
          expiration_Date: new Date(Number(expire)).toDateString(),
          send: send
        });
      }

      this.prescriptions = prescriptions;
    },

    async revertSend(tokenID) {
      try {
        const res = PrescriptionsABI.getContract().methods.approve("0x0000000000000000000000000000000000000000", Number(tokenID)).send({ from: web3.currentProvider.selectedAddress });
        const transactionHash = `transaction hash: ${res.transactionHash}`;
        Vue.$toast.open({
          message: transactionHash,
          type: 'success',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
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
    },
  },
  async created() {
    this.patientAddress = 'Patient Address';
    await this.getPrescriptions();
    setInterval(this.getPrescriptions, 10000);
  },
};
</script>
