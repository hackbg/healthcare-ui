<template>
  <div>
    <b-modal
      id="prescription-send"
      class="modal-prescription-send"
      :title="sendPrescription"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit" class="modal-form">
        <b-form-group
          :label="pharmacyAddress"
          label-for="pharmacy-address-input"
          invalid-feedback="errPharmacyAddr"
          :state="newPharmacyState"
        >
          <b-form-input list="my-list-id" v-model="newPharmacy"></b-form-input>
          <datalist id="my-list-id">
            <option v-for="pharmacy in pharmacies" v-bind:key="pharmacy.address">{{ pharmacy.name }} - {{ pharmacy.address }}</option>
          </datalist>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
// import web3 from "../web3/web3";
import abi from '../web3/prescriptionsABI';
import '../assets/css/app.css';

export default {
  name: 'PrescriptionSend',
  props: {
    tokenID: String
  },
  data() {
    return {
      sendPrescription: this.$i18n.t('labels.sendPrescription'),
      pharmacyAddress: this.$i18n.t('labels.pharmacyAddress'),
      errPharmacyAddr: this.$i18n.t('errors.err-pharmacy-address'),
      newPharmacy: '',
      newPharmacyState: null,
      pharmacies: [{name: "Apteka 1", address: "0x111"}, {name: "Apteka 2", address: "0x222"}, {name: "Apteka 3", address: "0x333"}] // TODO: change after
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.newPharmacyState = true;

      if (!valid) {
        if (this.newPharmacy === '') this.newPharmacyState = false;
        return false;
      }
      // if(!web3.utils.isAddress(this.newPharmacy)) { //isAddress - does it is valid pharmacy address
      //   this.newPharmacyState = false;
      //   return false;
      // }
      return true;
    },
    resetModal() {
      this.newPharmacy = '';
      this.newPharmacyState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) return;
      let address = this.newPharmacy;
      if(this.newPharmacy.includes(' - ')) {
        address = this.newPharmacy.split(' - ')[1];
      }
      await abi.approve(address, this.tokenID);
      // abi.changeAddress(this.newWallet);
      // this.getWallets();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('prescription-send');
      });
    },
  },
};
</script>
