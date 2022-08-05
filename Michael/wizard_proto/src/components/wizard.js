import { createApp } from 'vue';
import axios from 'axios';


const stepNavigation = {
    template: "#wizard-step-navigation-template",

    props: ["steps", "currentStep"]
};

const stepNavigationStep =  {
    template: "#wizard-step-navigation-step-template",

    props: ["step", "currentStep"],

    computed: {
        indicatorclass() {
            return {
                active: this.step.id == this.currentStep,
                complete: this.currentStep > this.step.id
            };
        }
    }
};


if (document.getElementById("wizard")) {
  createApp({
    data() {
      return {
        currentStep: 1,
        stepCount: 5,
        taxNumberExists: true,

        teamMembers: [],
        taxIdentificationNumbers: [],

        steps: [
            {
                id: 1,
                title: "Basic Information"
            },
            {
                id: 2,
                title: "Address"
            },
            {
                id: 3,
                title: "Team Members"
            },
            {
                id: 4,
                title: "Assign Global Admins"
            },
            {
                id: 5,
                title: "Review/Submit"
            }
        ],

        corporation: {
            companyName: "",
            website: "",
            email: "",
            phone: "",
            tinType: "",
            fedTaxClassification: "",
            taxIdentificationNumber: "",
            address: {
                addressType: "",
                country: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zipCode: ""
            },
            teamMembers: {
                firstName: "",
                lastName: "",
                email: "",
                role: ""
            }

        },
      }
    },
    async created() {
      try {
        const res = await axios.get(`http://localhost:3000/teamMembers`);
        this.teamMembers = res.data;
      } catch (error) {
        console.log(error);
      }

      try {
        const res = await axios.get(`http://localhost:3000/taxIdentificationNumbers`);
        this.taxIdentificationNumbers = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    methods: {
        nextStep() {
            this.currentStep += 1;
            console.log(this.corporation);
        },

        backStep() {
            this.currentStep -= 1;
        },

        refresh() {
            window.location.reload();
        },

        checkTin() {
            this.taxNumberExists = this.taxIdentificationNumbers.some(x => x == this.corporation.taxIdentificationNumber);
        },

        async createCorporation() {
            const res = await axios.post(`http://localhost:3000/corporations`);
        }
    },

  })
  .component("step-navigation", stepNavigation)
  .component("step-navigation-step", stepNavigationStep)
  .mount("#wizard");
}


