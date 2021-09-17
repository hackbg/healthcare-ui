<template>
  <div>
    <form ref="form" @submit.stop.prevent="handleSubmit" class="modal-form">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t('labels.sendPrescription') }}</p>
          <button
            type="button"
            class="delete"
            @click="$emit('close')"/>
        </header>
        <section class="modal-card-body">
          <b-field :label="pharmacyAddress">
          <div>
            <b-input list="my-list-id"
              v-model="newPharmacy"
              :placeholder="lblDropDownPlaceholder"
            ></b-input>
            <datalist id="my-list-id">
              <option
                v-for="pharmacy in pharmacies"
                v-bind:key="pharmacy.address">{{ pharmacy.name }} - {{ pharmacy.address }}
              </option>
            </datalist>
          </div>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button
            :label="btnClose"
            @click="handleClose" />
          <b-button
            :label="btnOK"
            @click="handleOk"
            type="is-primary" />
        </footer>
      <!-- <b-form-group
        :label="pharmacyAddress"
        label-for="pharmacy-address-input"
        invalid-feedback="errPharmacyAddr"
        :state="newPharmacyState"
      >
        <b-form-input list="my-list-id" v-model="newPharmacy" class="input-main"></b-form-input>
        <datalist id="my-list-id">
          <option v-for="pharmacy in pharmacies" v-bind:key="pharmacy.address">{{ pharmacy.name }} - {{ pharmacy.address }}</option>
        </datalist>
      </b-form-group> -->
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import web3 from "../web3/web3";
import prescriptionsABI from '../web3/prescriptionsABI';
import '../assets/css/app.css';
import pharmaciesData from '../data/pharmacies.json';

export default {
  name: 'PrescriptionSend',
  props: {
    tokenID: String
  },
  data() {
    return {
      // sendPrescription: this.$i18n.t('labels.sendPrescription'),
      pharmacyAddress: this.$i18n.t('labels.pharmacyAddress'),
      errPharmacyAddr: this.$i18n.t('errors.err-pharmacy-address'),
      lblDropDownPlaceholder: this.$i18n.t('labels.dropDownPlaceholder'),
      btnClose: this.$i18n.t('buttons.close'),
      btnOK: this.$i18n.t('buttons.ok'),
      newPharmacy: '',
      newPharmacyState: null,
      pharmacies: pharmaciesData
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
    handleClose() {
      this.$emit('close');
      this.resetModal();
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
      this.resetModal();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) return;
      let address = this.newPharmacy;
      if(this.newPharmacy.includes(' - ')) {
        address = this.newPharmacy.split(' - ')[1];
      }
      try {
        const res = prescriptionsABI.getContract().methods.approve(address, Number(this.tokenID)).send({ from: web3.currentProvider.selectedAddress }); // TODO: removed await because the modal doesn't close but is not the best desicion...to think about it
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
          message: ex.message,
          type: 'error',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
      }
      // prescriptionsABI.changeAddress(this.newWallet);
      // this.getWallets();
      // Hide the modal manually
      // this.$nextTick(() => {
      //   this.$bvModal.hide('prescription-send');
      // });
    },
  },
};
</script>
