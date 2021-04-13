<template>
  <div class="main-container content">
    <div class="title">
      {{ $t('text.insurance.createInsurance') }}
    </div>
    <form>
      <div class="tb-container">
        <div class="first-tb label-tb">
          {{ $t('labels.patientAddress') }}:
        </div>
        <b-form-group class="form-control-no-modal second-tb"
            :invalid-feedback="errPatientAddr"
            :state="newPatientState"
          >
          <b-form-input list="my-list-id" v-model="newPatient"></b-form-input>
          <datalist id="my-list-id">
            <option v-for="patient in patients" v-bind:key="patient.address">{{ patient.name }} - {{ patient.address }}</option>
          </datalist>
        </b-form-group>
        <input v-model="insuranceAmmount" :placeholder="amountLbl" class="simple-input third-tb"/>
        <b-button class="fourt-tb btn-tb" size="md" variant="primary" @click="newPrescription">
          {{ $t('buttons.send') }}
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'InsuranceInsurer',
  props: {
    msg: String,
  },
  data() {
    return {
      newPatient: '',
      newPatientState: null,
      errPatientAddr: this.$i18n.t('errors.err-patient-address'),
      amountLbl: this.$i18n.t('labels.amount'),
      insuranceAmmount: '',
      patients: [{name: "Patient 1", address: "0x111"}, {name: "Patient 2", address: "0x222"}, {name: "Patient 3", address: "0x333"}], // TODO: change after
    };
  },
  methods: {
    newPrescription() {
      console.log(this.newPatient);
      console.log(this.insuranceAmmount);
    }
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
};
</script>
