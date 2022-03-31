export interface User{
  id: string,
  userName: string,
  email: string,
  firstName: string,
  secondName: string,
  role: string
}

export interface UserForCreationDto{
  email: string,
  firstName: string,
  secondName: string,
  password: string,
  passwordConfirm: string,
  role: string
}

export interface UserForUpdateDto{
  email: string,
  firstName: string,
  secondName: string,
}

export interface Role{
  id: string,
  name: string
}

export interface PasswordChangeDto{
  oldPassword: string,
  newPassword: string
}

export interface RoleForCreationDto{
  name: string,
  permissions: Permission[]
}

export interface PermissionForRole{
  name: string
}

export interface Permission{
  id: number,
  name: string,
  description: string
}

export interface UserForAuthenticationDto{
  email: string
  password: string
}

export interface ServerAuthResponse{
  minutesToExpire: number,
  role: string,
  token: string
}

export interface Chat{
  id: number,
  userRequest: string,
  botResponse: string,
  nextIds: string
}

export interface ChatForManipulationDto{
  userRequest: string,
  botResponse: string,
  nextIds: string
}
