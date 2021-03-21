import * as React from 'react';
import { Routes } from 'estafette-router';
import { Login } from 'components/molecules/Login/Login';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { UserMenu } from 'components/organisms/UserMenu/UserMenu';
import { CurrentObject } from 'components/molecules/CurrentObject/CurrentObject';
import { AddWorkerTime } from 'components/molecules/AddWorkerTime/AddWorkerTime';
import { AdminCreateUser } from 'components/molecules/AdminCreateUser/AdminCreateUser';
import { CreateObject } from 'components/molecules/CreateObject/CreateObject';
import { EditObject } from 'components/molecules/EditObject/EditObject';
import { InventoryList } from 'components/molecules/InventoryList/InventoryList';
import { ObjectList } from 'components/molecules/ObjectList/ObjectList';
import { ProfileAddMat } from 'components/molecules/ProfileAddMat/ProfileAddMat';
import { ProfileEditMat } from 'components/molecules/ProfileEditMat/ProfileEditMat';
import { UserList } from 'components/molecules/UserList/UserList';
import { UserProfile } from 'components/molecules/UserProfile/UserProfile';
import { WaitingObjectList } from 'components/molecules/WaitingObjectList/WaitingObjectList';
import { WerehouseList } from 'components/molecules/WerehouseList/WerehouseList';
import { WorkList } from 'components/molecules/WorkList/WorkList';
import { SalaryList } from 'components/molecules/SalaryList/SalaryList';

const LoginPage = (): React.ReactNode => <Login />;
const AdminPage = (): React.ReactNode => <AdminMenu />;
const StaffPage = (): React.ReactNode => <UserMenu />;
const CurrentObjectPage = (): React.ReactNode => <CurrentObject />;
const EditObjectPage = (): React.ReactNode => <EditObject />;
const AddWorkerTimePage = (): React.ReactNode => <AddWorkerTime />;
const ProfileEditMatPage = (): React.ReactNode => <ProfileEditMat />;
const WaitingObjectListPage = (): React.ReactNode => <WaitingObjectList />;
const ProfileAddMatPage = (): React.ReactNode => <ProfileAddMat />;
const UserProfilePage = (): React.ReactNode => <UserProfile />;
const UserListPage = (): React.ReactNode => <UserList />;
const InventoryListPage = (): React.ReactNode => <InventoryList />;
const ObjectListPage = (): React.ReactNode => <ObjectList />;
const WerehouseListPage = (): React.ReactNode => <WerehouseList />;
const WorkListPage = (): React.ReactNode => <WorkList />;
const AdminCreateUserPage = (): React.ReactNode => <AdminCreateUser />;
const CreateObjectPage = (): React.ReactNode => <CreateObject />;
const SalaryListPage = (): React.ReactNode => <SalaryList />;

export const routes: Routes[] = [
  { name: 'Login', path: '/', exact: true, component: LoginPage },
  { name: 'AdminPage', path: '/admin-menu', exact: true, component: AdminPage },
  { name: 'StaffPage', path: '/staff-menu', exact: true, component: StaffPage },
  {
    name: 'SalaryListPage',
    path: '/admin-menu/salary-list',
    exact: true,
    component: SalaryListPage
  },
  {
    name: 'CurrentObjectPage',
    path: '/admin-menu/curent-object',
    exact: true,
    component: CurrentObjectPage
  },
  {
    name: 'EditObjectPage',
    path: '/admin-menu/edit-object/:objectId',
    exact: true,
    component: EditObjectPage
  },
  {
    name: 'AddWorkerTimePage',
    path: '/admin-menu/edit-object-worker-time/:objectId',
    exact: true,
    component: AddWorkerTimePage
  },
  {
    name: 'ProfileEditMatPage',
    path: '/admin-menu/user-profile-edit-material',
    exact: true,
    component: ProfileEditMatPage
  },
  {
    name: 'WaitingObjectListPage',
    path: '/admin-menu/object-waiting-list',
    exact: true,
    component: WaitingObjectListPage
  },
  {
    name: 'ProfileAddMatPage',
    path: '/admin-menu/user-profile-add-material/:userId',
    exact: true,
    component: ProfileAddMatPage
  },
  {
    name: 'UserProfilePage',
    path: '/admin-menu/user-profile',
    exact: true,
    component: UserProfilePage
  },
  {
    name: 'UserListPage',
    path: '/admin-menu/user-list',
    exact: true,
    component: UserListPage
  },
  {
    name: 'InventoryListPage',
    path: '/admin-menu/inventory-list',
    exact: true,
    component: InventoryListPage
  },
  {
    name: 'ObjectListPage',
    path: '/admin-menu/object-list',
    exact: true,
    component: ObjectListPage
  },
  {
    name: 'WerehouseListPage',
    path: '/admin-menu/werehouse-list',
    exact: true,
    component: WerehouseListPage
  },
  {
    name: 'WorkListPage',
    path: '/admin-menu/work-price-list',
    exact: true,
    component: WorkListPage
  },
  {
    name: 'AdminCreateUserPage',
    path: '/admin-menu/create-user',
    exact: true,
    component: AdminCreateUserPage
  },
  {
    name: 'CreateObjectPage',
    path: '/admin-menu/create-object',
    exact: true,
    component: CreateObjectPage
  }
];
