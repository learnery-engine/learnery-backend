alter table courses
    add constraint check_name
        check (duration_in_hours <= 100);

alter table courses
    add constraint duration_lesson
        check (duration_lesson <= 100);

