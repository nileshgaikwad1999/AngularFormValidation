import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../../Shared/CustomValidators';

@Component({
  selector: 'app-sampleform',
  templateUrl: './sampleform.component.html',
  styleUrls: ['./sampleform.component.css'],
})
export class SampleformComponent implements OnInit {
  sampleForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formMaking();

    this.sampleForm.valueChanges.subscribe(() => {
      this.logValidator(this.sampleForm);
    });
  }

  formMaking() {
    this.sampleForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      Email: ['', [Validators.required,CustomValidators.emailDomainParamter('gmail.com')]],
      Skill: this.fb.array([this.addSkill()]),
    });
  }
 get getSkillControls() {
    return (this.sampleForm.get('Skill') as FormArray);
  }
  addSkill():FormGroup {
    return this.fb.group({
      MasterSkill: ['',Validators.required],
    });
  }

  AddSkillButtonClick() {
    (this.sampleForm.get('Skill') as FormArray).push(this.addSkill());
  }
  removeSkillButtonClick(index:number){
   (<FormArray> this.sampleForm.get('Skill')).removeAt(index);
  }

  formValidators: { [key: string]: any } = {
    firstName: {
      required: 'this filed is required',
      minlength: 'name grater that 2 character',
    },
    Email: {
      required: 'this filed is required',
      Emaildomain: 'Email should in format xxx@gmail.com',

    },
    MasterSkill: {
      required: 'this filed is required',
    },
    
  };
  FormErros: { [key: string]: any } = {
    firstName: '',
    Email: '',
    MasterSkill: '',
  };

  logValidator(group: FormGroup = this.sampleForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      const messages = this.formValidators[key];
      this.FormErros[key] = '';
      if (
        !abstractControl?.valid &&
        abstractControl &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.FormErros[key] += messages[errorKey];
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidator(abstractControl);
      }
      if (abstractControl instanceof FormArray) {
        for (let control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidator(control);
          }
        }
      }
    });
  }
  onSubmit() {
    console.log(this.sampleForm);
  }
}
