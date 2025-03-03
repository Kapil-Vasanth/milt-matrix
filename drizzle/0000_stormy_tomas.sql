CREATE TABLE "committee_members" (
	"committee_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"role" varchar(255) NOT NULL,
	CONSTRAINT "committee_members_committee_id_user_id_pk" PRIMARY KEY("committee_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "committees" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "committees_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"chair_id" integer NOT NULL,
	"vice_chair_id" integer NOT NULL,
	"secretary_id" integer NOT NULL,
	"treasurer_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "roles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"permissions" varchar(255)[]
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "user_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"clerk_id" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_committee_id_committees_id_fk" FOREIGN KEY ("committee_id") REFERENCES "public"."committees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "committees" ADD CONSTRAINT "committees_chair_id_users_id_fk" FOREIGN KEY ("chair_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "committees" ADD CONSTRAINT "committees_vice_chair_id_users_id_fk" FOREIGN KEY ("vice_chair_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "committees" ADD CONSTRAINT "committees_secretary_id_users_id_fk" FOREIGN KEY ("secretary_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "committees" ADD CONSTRAINT "committees_treasurer_id_users_id_fk" FOREIGN KEY ("treasurer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;