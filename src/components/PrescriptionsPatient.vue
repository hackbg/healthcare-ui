<template>
  <div class="box">
    <p v-if="prescriptions.length == 0" class="no-prescriptions">
      {{ $t('text.prescriptions.noPrescription') }}
    </p>
    <div v-else>
      <b-table :data="prescriptions" class="user-table">
        <b-table-column field="prescriptions" :label=this.lblPrescriptions centered v-slot="props">
          {{ props.row.prescriptions }}
        </b-table-column>

        <b-table-column field="medicines" :label=this.lblMedicines centered v-slot="props">
          {{ props.row.medicines }}
        </b-table-column>

        <b-table-column field="expiration_Date" :label=this.lblExpirationDate centered v-slot="props">
          {{ props.row.expiration_Date }}
        </b-table-column>

        <b-table-column field="send" :label=this.lblSend centered v-slot="props">
          <b-button
            v-if="!props.row.send"
            @click="selectedId = props.row.prescriptions; isComponentModalActive = true"
            size="sm"
            class="button is-success"
          >
            {{ $t('buttons.send') }}
          </b-button>
          <b-button
            v-else
            size="sm"
            class="button is-danger"
            @click="revertSend(props.row.prescriptions)"
          >
            {{ $t('buttons.revert') }}
          </b-button>
        </b-table-column> 
      </b-table>
    </div>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      :aria-label="lblSendPrescription"
      aria-modal>
      <template #default="props">
        <PrescriptionSend :tokenID="selectedId" @close="props.close"></PrescriptionSend>
      </template>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
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
      lblPrescriptions: this.$i18n.t('labels.prescriptions'),
      lblMedicines: this.$i18n.t('labels.medicines'),
      lblExpirationDate: this.$i18n.t('labels.expirationDate'),
      lblSend: this.$i18n.t('labels.send'),
      lblSendPrescription: this.$i18n.t('labels.sendPrescription'),

      prescriptions: [],
      selectedId: '',
      isComponentModalActive: false,
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
        // console.log(send);
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