import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../Shared/CustomValidators';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../Service/employee.service';
import { IEmployee } from '../Model/IEmployee';
import { ISkill } from '../Model/ISkill';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  FullNameLength: number = 0;
  pageTitle="Create Employee"
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  employee!: IEmployee;

  ngOnInit(): void {
    //this.employeeFormGroup();
    this.employeeFromBuilder();

    this.employeeForm.get('FullName')?.valueChanges.subscribe({
      next: (val: string) => (this.FullNameLength = val.length),
    });
    this.employeeForm.valueChanges.subscribe((val) => {
      this.logValidationError(this.employeeForm);
    });

    this.employeeForm
      .get('contactPreference')
      ?.valueChanges.subscribe((val) => {
        this.onContactChangePreference(val);
      });

    this.route.paramMap.subscribe((params: any) => {
      const empId = +params.get('id');
      if (empId) {
        this.pageTitle="Edit Employee"

        this.getEmployee(empId);
      }else{
        this.employee={
          id:0,
          contactPreference:"",
          email:"",
          fullName:"",
          skills:[]
        }
      }
    });
  }
  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe({
      next: (res: IEmployee) => {
        this.editEmploye(res);
        this.employee = res;
        console.log(this.employee.id);
      },
      error: (er) => console.log(er),
    });
  }
  editEmploye(employee: IEmployee) {
    this.employeeForm.patchValue({
      FullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        conformEmail: employee.email,
      },
      phone: employee.phone,
    });
    let skills:ISkill[]=employee.skills;
    this.employeeForm.setControl(
      'Skill',
      this.setExistingSkill(skills)
    );
  }
  setExistingSkill(skillSets: ISkill[]): FormArray<FormGroup> {
    const formArray = new FormArray<FormGroup>([]);
    skillSets.forEach((s:ISkill) => {
      let d=this.fb.group({
        id:s.id,
        SkillName: s.SkillName,
        ExperienceInYear: s.ExperienceInYear,
        proficiency: s.proficiency,
      });
      formArray.push(d);
    });
    
    return formArray;
  }
  mapFormValueToEmployee() {
    this.employee.fullName = this.employeeForm.value.FullName;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.contactPreference=this.employeeForm.value.contactPreference;
    this.employee.phone = this.employeeForm.value.phone;
    //this.employee.skills=this.employeeForm.value.Skill;

    for (let i = 0; i <this.employeeForm.value.Skill.length; i++) {
        let skills: ISkill = {
          id:this.employee.skills[i]?.id,
        ExperienceInYear:this.employeeForm.value.Skill[i].ExperienceInYear,
        SkillName:this.employeeForm.value.Skill[i].SkillName,
        proficiency: this.employeeForm.value.Skill[i].proficiency
       };
      this.employee.skills.push(skills);
    }
  }
  onSubmit() {
    this.mapFormValueToEmployee();
    if(this.employee.id!=0){
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: () => {
        this.router.navigate(['reactiveList']);
      },
      error: (err) => console.log(err),
    });
  }
  else{
    this.employeeService.addEmployee(this.employee).subscribe({
      next: () => {
        this.router.navigate(['reactiveList']);
      },
      error: (err) => console.log(err),
    });
  }
  }

  employeeFromBuilder() {
    this.employeeForm = this.fb.group({
      FullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],

      contactPreference: [''],
      emailGroup: this.fb.group(
        {
          email: [
            '',
            [
              Validators.required,
              CustomValidators.emailDomainParamter('co.com'),
            ],
          ],
          conformEmail: ['', Validators.required],
        },
        { validator: CustomValidators.emailMismatch } as AbstractControlOptions
      ),

      phone: ['', Validators.required],
      //create skill form group
      // Skill:this.fb.group({

      //     SkillName: ['',Validators.required],
      //     ExperienceInYear: ['',Validators.required],
      //     proficiency: ['',Validators.required],

      // })

      Skill: this.fb.array([this.AddSkillGroup()]),
    });
  }

  AddSkillGroup(): FormGroup {
    return this.fb.group({
      SkillName: ['', Validators.required],
      ExperienceInYear: ['', Validators.required],
      proficiency: ['', Validators.required],
    });
  }
  addSkillButtonClick() {
    (<FormArray>this.employeeForm.get('Skill')).push(this.AddSkillGroup());
  }
  get getSkillControls(): FormArray {
    return this.employeeForm.get('Skill') as FormArray;
  }
  removeElemnt(index: number): void {
    const formSkillArray = <FormArray>this.employeeForm.get('Skill');
    formSkillArray.removeAt(index);
    formSkillArray.markAsDirty();
    formSkillArray.markAsTouched();
  }
  employeeFormGroup() {
    this.employeeForm = new FormGroup({
      FullName: new FormControl(),
      email: new FormControl(),
      //create skill form group
      Skill: new FormGroup({
        SkillName: new FormControl(),
        ExperienceInYear: new FormControl(),
        proficiency: new FormControl(),
      }),
    });
  }

  onLoadDataClick() {
    this.employeeForm.setValue({
      FullName: 'Tech Solution',
      email: 'tech@co.com',
      Skill: {
        SkillName: 'Dot Net',
        ExperienceInYear: 20,
        proficiency: 'intermediate',
      },
    });
    // this.logValidationError(this.employeeForm);
    // console.log(this.formError);
  }
  onLoadSkillDataClick() {
    this.employeeForm.patchValue({
      Skill: {
        SkillName: 'Dot Net',
        ExperienceInYear: 20,
        proficiency: 'intermediate',
      },
    });
  }
  validationMessages: { [key: string]: any } = {
    FullName: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be greater than 2 characters.',
      maxlength: 'Full Name must be less than 10 characters.',
    },
    email: {
      required: 'Email is required.',
      Emaildomain: 'email not in correct format should be A@co  .com',
    },
    SkillName: {
      required: 'Skill Name is required.',
    },
    ExperienceInYear: {
      required: 'Experience is required.',
    },
    proficiency: {
      required: 'Proficiency is required.',
    },
    phone: {
      required: 'phone is required.',
    },
    conformEmail: {
      required: 'conformEmail is required.',
    },
    emailGroup: {
      Mismatch: 'Email and Confirm Email do not match.',
    },
  };
  logValidationError(group: FormGroup = this.employeeForm) {
    Object.keys(group.controls).forEach((key: any) => {
      const abstractControl = group.get(key);
      this.formError[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched ||
          abstractControl.dirty ||
          abstractControl.value !== '')
      ) {
        const messages = this.validationMessages[key];
        for (const errorkey in abstractControl.errors) {
          if (errorkey) {
            this.formError[key] += messages[errorkey] + '';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationError(abstractControl);
      }
      if (abstractControl instanceof FormArray) {
        for (let control of abstractControl.controls) {
          if (control instanceof FormGroup) this.logValidationError(control);
        }
      }
    });
  }
  
  formError: { [key: string]: any } = {
    FullName: '',
    email: '',
    SkillName: '',
    ExperienceInYear: '',
    proficiency: '',
    phone: '',
    conformEmail: '',
  };
 
  onContactChangePreference(selecteValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selecteValue == 'phone') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
}

function emailDomain(controls: AbstractControl): { [key: string]: any } | null {
  let email: string = controls.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (email === '' || domain.toLocaleLowerCase() === 'opteamix.com') {
    return null;
  } else {
    return { Emaildomain: true };
  }
}
