<template>
  <div>
    <form ref="form" @submit.stop.prevent="handleSubmit" class="modal-form">
      <div class="modal-card prescription-modal">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t('labels.sendPrescription') }}</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field :label="pharmacyAddress">
            <b-autocomplete
            required
            :open-on-focus="true"
            v-model="newPharmacy"
            :data="pharmacysList"
            :placeholder="lblDropDownPlaceholder"
            :clearable="true"
          >
          </b-autocomplete>
            <!-- <div>
              <b-input
                list="my-list-id"
                v-model="newPharmacy"
                :placeholder="lblDropDownPlaceholder"
                required
              ></b-input>
              <datalist id="my-list-id">
                <option v-for="pharmacy in pharmacies" v-bind:key="pharmacy.address">
                  {{ pharmacy.name }} - {{ pharmacy.address }}
                </option>
              </datalist>
            </div> -->
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button :label="btnClose" @click="handleClose"/>
          <b-button :label="btnOK" @click="handleOk" type="is-primary" id="btn-ok"/>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import prescriptionsABI from '../web3/prescriptionsABI';
import '../assets/scss/app.scss';
import pharmaciesData from '../data/pharmacies.json';

export default {
  name: 'PrescriptionSend',
  props: {
    tokenID: String,
  },
  data() {
    return {
      // sendPrescription: this.$i18n.t('labels.sendPrescription'),
      pharmacyAddress: this.$i18n.t('labels.pharmacyAddress'),
      errPharmacyAddr: this.$i18n.t('errors.err-pharmacy-address'),
      lblDropDownPlaceholder: this.$i18n.t('labels.dropDownPlaceholder'),
      failSendTransaction: this.$i18n.t('errors.err-transaction-send'),
      sentPrescription: this.$i18n.t('labels.sentPrescription'),
      receivedPrescription: this.$i18n.t('labels.receivedPrescription'),
      btnClose: this.$i18n.t('buttons.close'),
      btnOK: this.$i18n.t('buttons.ok'),
      newPharmacy: '',
      newPharmacyState: null,
      pharmacies: pharmaciesData,
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
      // if(!this.$store.state.web3.utils.isAddress(this.newPharmacy)) { //isAddress - does it is valid pharmacy address
      //   this.newPharmacyState = false;
      //   return false;
      // }
      return true;
    },
    resetModal() {
      this.newPharmacy = "";
      this.newPharmacyState = null;
    },
    handleClose() {
      // this.resetModal();
      this.$emit('close');
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
      // if (!this.checkFormValidity()) return;
      let address = this.newPharmacy;
      if (this.newPharmacy.includes(' - ')) {
        address = this.newPharmacy.split(' - ')[1];
      }
      try {
        prescriptionsABI
          .getContract()
          .methods.approve(address, Number(this.tokenID))
          .send({from: this.$store.state.web3.currentProvider.selectedAddress},
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
            this.newPharmacy = "";

         // TODO: removed await because the modal doesn't close but is not the best desicion...to think about it
        Vue.$toast.open({
          message: this.sentPrescription,
          type: 'success',
          duration: 3000,
          pauseOnHover: true,
          position: 'top-right',
        });
        const pendingTxHashes = this.$store.state.pendingTxHashes;
          pendingTxHashes.push({
            tx: transactionHash,
            msg: this.receivedPrescription,
          });
          this.$store.commit('pendingTxHashes', pendingTxHashes);
        });
      } catch (ex) {
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
  computed: {
    pharmacysList() {
      return this.pharmacies.map(pharmacy => `${pharmacy.name} - ${pharmacy.address}`);
    },
  }
};
</script>

<style scoped>
  .prescription-modal {
    min-height: 28rem;
  }
</style>