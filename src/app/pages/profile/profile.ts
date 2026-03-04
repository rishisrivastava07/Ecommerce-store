import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LucideAngularModule, Mail, Phone, User, MapPin } from 'lucide-angular';
import { profileFeatures } from './store/profile-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { profileActions } from './store/profile-actions';
import { authFeatures } from '../../shared/store/auth-feature';
import { MyStorage } from '../../shared/services/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [LucideAngularModule],
})

export class Profile implements OnInit {
  protected readonly icons = { User, Mail, Phone, MapPin };
  private readonly store = inject(Store);
  private readonly storage = inject(MyStorage);
  protected readonly profile = toSignal(this.store.select(profileFeatures.selectProfile));
  protected readonly loading = toSignal(this.store.select(profileFeatures.selectLoading));
  protected readonly userId = toSignal(this.store.select(authFeatures.selectUserId));

  ngOnInit(): void {
    const userId = this.userId() ?? this.storage.getUserId();

    if (userId) {
      this.store.dispatch(profileActions.load({ userId }));
    }
  }
}
