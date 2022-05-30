import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public searchForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });

    this.onSearchChanges();
  }

  private onSearchChanges(): void {
    this.searchForm.get('search')?.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((textSearched: string) => {
        console.log(this.normalizeAndConvertToLowerCase(textSearched));
      })
  }

  private normalizeAndConvertToLowerCase(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  }
}
