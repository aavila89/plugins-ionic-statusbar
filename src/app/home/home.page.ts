import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  color = 'dark';
  bgcolor = 'light';
  themeToggle = false;
  constructor() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));
  }

  setStatus() {
    if (this.color === 'light') {
      this.setStatusBarStyleDark();
    } else {
      this.setStatusBarStyleLight();
    }
  }

  async setStatusBarStyleDark() {
    this.color = 'dark';
    this.bgcolor = 'light';
    await StatusBar.setStyle({ style: Style.Dark });
  };
  
  async setStatusBarStyleLight() {
    this.color = 'light';
    this.bgcolor = 'dark';
    await StatusBar.setStyle({ style: Style.Light });
  };

  async setBackgroundColor() {
    await StatusBar.setBackgroundColor({ color: '#ea6f65' });
  };

  // Check/uncheck the toggle and update the theme based on isDark
  initializeDarkTheme(isDark: boolean) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark theme
  toggleChange(ev: any) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }

}
