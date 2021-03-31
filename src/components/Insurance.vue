<template>
  <div class="main-container content">
    <div v-if="userType === 'patient'">
      <div class="title">
        {{ $t('text.insurance.title-patient') }}
      </div>
      <form>
        <b-form-group class="form-control-no-modal"
            :label="doctorAddress"
            label-for="doctor-address-input"
            :invalid-feedback="errDoctorAddr"
            :state="newDoctorState"
          >
          <b-form-input list="my-list-id" v-model="newDoctor"></b-form-input>
          <datalist id="my-list-id">
            <option v-for="doctor in doctors" v-bind:key="doctor.address">{{ doctor.name }} - {{ doctor.address }}</option>
          </datalist>
        </b-form-group>
      </form>
      <b-button size="md" variant="primary" @click="newPrescription()">
        {{ $t('buttons.send') }}
      </b-button>
    </div>

    <div v-else>
      <div class="title">
        {{ $t('text.insurance.createInsurance') }}
      </div>
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
      <input v-model="message" :placeholder="amount" class="simple-input"/>
      <b-button size="md" variant="primary" @click="newPrescription()">
        {{ $t('buttons.send') }}
      </b-button>
    </div>
  </div>
</template>

<script>
// import '../assets/css/not_found.css'; //TODO: delete after if not used

export default {
  name: 'Insurance',
  props: {
    msg: String,
  },
  data() {
    return {
      newPatient: '',
      newPatientState: null,
      newDoctor: '',
      newDoctorState: null,
      doctorAddress: this.$i18n.t('labels.doctorAddress'),
      patientAddress: this.$i18n.t('labels.patientAddress'),
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      errDoctorAddr: this.$i18n.t('errors.err-doctor-address'),
      amount: this.$i18n.t('labels.amount'),
      patients: [{name: "Patient 1", address: "0x111"}, {name: "Patient 2", address: "0x222"}, {name: "Patient 3", address: "0x333"}], // TODO: change after
      doctors: [{name: "Doctor 1", address: "0x111"}, {name: "Doctor 2", address: "0x222"}, {name: "Doctor 3", address: "0x333"}] // TODO: change after
    };
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
};
</script>
