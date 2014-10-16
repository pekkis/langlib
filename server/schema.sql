CREATE TABLE langlib_keys (id integer auto_increment, langlib_key varchar(255) not null unique, PRIMARY KEY(id)) engine=InnoDB;

CREATE TABLE langlib_translations(
  id integer,
  locale varchar(255) NOT NULL,
  langlib_translation text NOT NULL default '',
  PRIMARY KEY(id, locale),
  FOREIGN KEY(id) REFERENCES langlib_keys(id) ON DELETE CASCADE ON UPDATE CASCADE
) engine=InnoDB;

