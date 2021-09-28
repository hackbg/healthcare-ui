<template>
  <div>
    <div class="box">
      <div class="is-flex is-justify-content-space-between">
        <div class="title">
          {{ $t('text.pharmacy.title1') }}
        </div>
        <b-button
          class="button is-primary"
          @click="receivedPrescription">
            <b-icon icon="magic"/>
            <strong>{{ $t('buttons.send') }}</strong>
        </b-button>
      </div>

      <b-field :label="lblPrescriptionTokenId">
        <b-input required v-model="prescriptionsTokenId"/>
      </b-field>
    </div>

    <div class="box">
      <div class="title">
        {{ $t('text.pharmacy.title2') }}
      </div>
      <p v-if="prescriptionsFulfilled.length === 0" class="no-prescriptions">
        {{ $t('text.prescriptions.noPrescription') }}
      </p>
      <div v-else>
        <b-table :data="prescriptionsFulfilled">
          <b-table-column field="prescriptions" :label=this.lblPrescriptions v-slot="props">
            {{ props.row.prescriptions }}
          </b-table-column>

          <b-table-column field="medicines" :label=this.lblMedicines v-slot="props">
            {{ props.row.medicines }}
          </b-table-column>

          <b-table-column field="expiration_Date" :label=this.lblExpirationDate v-slot="props">
            {{ props.row.expiration_Date }}
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PrescriptionsABI from '../web3/prescriptionsABI';

export default {
  name: 'PrescriptionsPharmacy',
  props: {
    msg: String,
  },
  data() {
    return {
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      lblPrescriptions: this.$i18n.t('labels.prescriptions'),
      lblMedicines: this.$i18n.t('labels.medicines'),
      lblExpirationDate: this.$i18n.t('labels.expirationDate'),
      // lblAccept: this.$i18n.t('labels.accept'),
      lblPrescriptionTokenId: this.$i18n.t('labels.prescriptionsTokenId'),
      lblPatientAddress: this.$i18n.t('labels.patientAddress'),
      prescriptionsFulfilled: [],
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
    this.patientAddress = this.lblPatientAddress;
    await this.getFulfilledPrescriptions();
    setInterval(this.getFulfilledPrescriptions, 10000);
  },
};
</script>
