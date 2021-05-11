import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Signup extends Vue {
    userName!: string
    email!: string
    password!: string
    confPassword!: string
}