import { AbilityBuilder, Ability } from '@casl/ability'
class Work {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}
const templateWork = new Work({ id: 1, isTemplate: true  });
const notWork = new Work({ id: 1, isTemplate: false  });
function defineRules() {
  const { can, cannot, build } = new AbilityBuilder(Ability)
  can("read", "Work");
  cannot("delete", "Work");
  can("update", "Work", { isTemplate: false });
  return build();
}

const rules = defineRules();
console.log(notWork.constructor.name);
console.log(rules.can("read", "Work"));
console.log(rules.can("delete", "Work"));
console.log(rules.can("update", templateWork));
console.log(rules.can("update", notWork));