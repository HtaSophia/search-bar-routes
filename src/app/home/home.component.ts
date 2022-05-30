import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RouteForSearch, ROUTES_FOR_SEARCH } from '../shared/utils/routes-for-search/routes-for-search.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public searchForm!: FormGroup;

  public filteredRoutes: RouteForSearch[] = [];

  private routes = [...ROUTES_FOR_SEARCH];

  constructor(private readonly formBuilder: FormBuilder, private readonly translateService: TranslateService) { }

  public ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    //Create the Search Form
    this.searchForm = this.formBuilder.group({
      search: [''],
    });

    this.onSearchChanges();
  }

  private onSearchChanges(): void {
    this.searchForm.get('search')?.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchText: string) => {
        if (!searchText.trim()) {
          this.filteredRoutes = [];
        } else {
          //Splits up the searchText to check each word separately
          const searchedWords = this.normalizeAndConvertToLowerCase(searchText).split(' ');

          //filtered routes that contains the searched words
          this.filteredRoutes = this.findRoutesWithSearchedWords(searchedWords);
        }
      })
  }

  /**
   * Function to find routes that contains the searched words in the keywords
   * @param searchedWords words used to filter the routes
   * @returns all routes that contains the searched words
   */
  private findRoutesWithSearchedWords(searchedWords: string[]): RouteForSearch[] {
    return this.routes.filter((route) =>
      //verifies if each searched word is in the route keywords
      //some of the keywords must be a searched word
      searchedWords.every((searchedWord) => route.keywords.some((keyword) =>
        //verifies if the translated keyword contains the searched word
        this.verifyStringContainsSubstring(this.translateService.instant(keyword), searchedWord))
      )
    );
  }

  /**
   * Function to verify if a string contains a substring
   * @param mainString the main string
   * @param subString the substring
   * @returns true if the main string contains the substring or false if it doesn't
   */
  private verifyStringContainsSubstring(mainString: string, substring: string): boolean {
    return this.normalizeAndConvertToLowerCase(mainString).includes(substring);
  }

  /**
   * Function to remove accents from a string and convert it to lower case
   * @param text a string that will change
   * @returns a lowercase string without accents
   */
  private normalizeAndConvertToLowerCase(text: string): string {
    return text.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  }
}
