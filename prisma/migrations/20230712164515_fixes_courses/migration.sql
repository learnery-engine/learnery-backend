-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_lesson_card_template_id_fkey" FOREIGN KEY ("lesson_card_template_id") REFERENCES "LessonCardTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
