<template>
  <div class="main-container content">
    <div class="padding" v-if="userType === 'patient'">
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

    <div v-else-if="userType === 'doctor'">
      <div class="title">
        {{ $t('text.prescriptions.doctor-title') }}
      </div>
      <!-- <input v-model="message" :placeholder="patientAddress" /> -->
      <form>
        <b-form-group class="form-control-no-modal"
            :label="patientAddress"
            label-for="patient-address-input"
            :invalid-feedback="errPatientAddr"
            :state="newPatientState"
          >
          <b-form-input list="my-list-id" v-model="newPatient"></b-form-input>
          <datalist id="my-list-id">
            <option v-for="patient in patients" v-bind:key="patient.address">{{ patient.name }} - {{ patient.address }}</option>
          </datalist>
        </b-form-group>
      </form>
      <b-button size="md" variant="primary" @click="newPrescription()">
        {{ $t('buttons.create') }}
      </b-button>
    </div>
<!-- TODO: andd in languages -->
    <div v-else-if="userType === 'pharmacy'">Filfuled prescriptions</div>
  </div>
</template>

<script>
// import web3 from "../web3/web3";
// import abi from '../web3/prescriptionsABI';
import '../assets/css/prescriptions.css';
import PrescriptionSend from './PrescriptionSend.vue';

export default {
  name: 'Prescriptions',
  props: {
    msg: String,
  },
  data() {
    return {
      newPatient: '',
      newPatientState: null,
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      patientAddress: this.$i18n.t('labels.patientAddress'),
      fields: ['prescriptions', 'medicines', 'expiration_Date', 'send'],
      patients: [{name: "Patient 1", address: "0x111"}, {name: "Patient 2", address: "0x222"}, {name: "Patient 3", address: "0x333"}], // TODO: change after
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
      prescriptions.push({
        prescriptions: 'TODO:',
      });
      this.prescriptions = prescriptions;
    },
    async newPrescription() {
      // TODO:
    },
    openSend() {
      // TODO: open PrescriptionsModal
    },
  },
  async created() {
    this.patientAdress = 'Patient Address';
    await this.getPrescriptions();
  },
};
</script>
