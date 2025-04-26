
const knex = require("../db/knex");
// const { sendEmail } = require("../utils/sendEmail");

const inactivateOldReinscriptions = async () => {
  const twentyDaysAgo = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);

  const parentsToInactivate = await knex("parents")
    .where("status", "re-inscription")
    .andWhere("updated_at", "<", twentyDaysAgo);

  for (const parent of parentsToInactivate) {
    await knex("parents")
      .where({ id: parent.id })
      .update({ status: "inactive", updated_at: new Date() });

    await sendReinscriptionEmail(
      parent.email,
      parent.nom || "Utilisateur"
    ); // customize message if needed
  }

  console.log(`${parentsToInactivate.length} parent accounts inactivated.`);
};

module.exports = inactivateOldReinscriptions;
