import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
    userName!: string
    password!: string
}