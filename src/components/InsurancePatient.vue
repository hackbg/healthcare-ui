<template>
  <div class="main-container content">
    <div class="title">
      {{ $t('text.insurance.title-patient') }}
    </div>
    <form>
      <div class="tb-container">
        <div class="first-tb label-tb">
          {{ $t('labels.doctorAddress') }}:
        </div>
        <b-form-group class="form-control-no-modal second-tb"
            :invalid-feedback="errDoctorAddr"
            :state="newDoctorState"
          >
          <b-form-input list="my-list-id" v-model="newDoctor"></b-form-input>
          <datalist id="my-list-id">
            <option v-for="doctor in doctors" v-bind:key="doctor.address">{{ doctor.name }} - {{ doctor.address }}</option>
          </datalist>
        </b-form-group>
        <input v-model="message" :placeholder="amountLbl" class="simple-input third-tb"/>
        <b-button class="fourt-tb btn-tb" size="md" variant="primary" @click="newPrescription()">
          {{ $t('buttons.send') }}
        </b-button>
      </div>
    </form>   
  </div>
</template>

<script>

export default {
  name: 'InsurancePatient',
  props: {
    msg: String,
  },
  data() {
    return {
      newDoctor: '',
      newDoctorState: null,
      errDoctorAddr: this.$i18n.t('errors.err-doctor-address'),
      amountLbl: this.$i18n.t('labels.amount'),
      insuranceAmmount: '',
      doctors: [{name: "Doctor 1", address: "0x111"}, {name: "Doctor 2", address: "0x222"}, {name: "Doctor 3", address: "0x333"}] // TODO: change after
    };
  },
};
</script>
