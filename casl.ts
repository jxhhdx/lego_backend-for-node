import { AbilityBuilder, Ability } from '@casl/ability'
class Work {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}
interface IUser {
  id: number;
  role: 'admin' | 'vip' | 'normal';
}

const adminUser: IUser = {
  id: 1,
  role: 'admin'
}
const vipUser: IUser = {
  id: 2,
  role: 'vip'
}
const normalUser: IUser = {
  id: 3,
  role: 'normal'
}

const templateWork = new Work({ id: 1, author: 3, isTemplate: true });
const notWork = new Work({ id: 1, author: 4, isTemplate: false });
function defineRules(user: IUser) {
  const { can, build } = new AbilityBuilder(Ability)
  // admin用户可以操作任何数据
  if (user.role === 'admin') {
    can('manage', 'all')
  } else if (user.role === 'vip') {
    can('download', 'Work')
  }

  if (user.role === 'normal' || user.role === 'vip') {
    can('read', 'Work')
    can('delete', 'Work', { author: user.id })
    can('update', 'Work', { author: user.id })
  }
  return build();
}

// admin role
const rules = defineRules(adminUser);
console.log('admin', rules.can("download", "Work"));
console.log('admin', rules.can("delete", "Work"));
console.log(rules.can("update", templateWork));
console.log(rules.can("update", notWork));

// vip role
const vip_rules = defineRules(vipUser);
console.log('vip', vip_rules.can("download", "Work"));
console.log('vip', vip_rules.can("delete", "Work"));
console.log(vip_rules.can("update", templateWork));
console.log(vip_rules.can("update", notWork));

// normal role
const normal_rules = defineRules(normalUser);
console.log('normal', normal_rules.can("download", "Work"));
console.log('normal', normal_rules.can("delete", "Work"));
console.log(normal_rules.can("update", templateWork));
console.log(normal_rules.can("update", notWork));