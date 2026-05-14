INSERT INTO categories (category_name) VALUES
('drugs'),
('injection'),
('cosmetic'),
('homeo'),
('pain-relief'),
('devices'),
('vitamins'),
('first-Aid');




-- Assuming the following category_ids based on the insertion order:
-- 1: drugs
-- 2: injection
-- 3: cosmetic
-- 4: homeo
-- 5: pain-relief
-- 6: devices
-- 7: vitamins
-- 8: first-Aid

INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id) VALUES
(1, 'A variety of medications for various ailments', 10.0, '/drugs.png', 29.99, 'Aspirin', 100, 24.99, 1),
(2, 'Used for injections of various medications', 5.0, '/injection.png', 15.99, 'Syringe', 50, 14.99, 2),
(3, 'Skin protection from the sun', 20.0, '/sun-block.png', 19.99, 'Sun Block', 80, 15.99, 3),
(4, 'Homeopathic remedies for common issues', 15.0, '/homeopathy.png', 25.99, 'Homeo Remedy', 60, 22.99, 4),
(5, 'Relieves various types of pain', 10.0, '/pain-relief.png', 9.99, 'Pain Relief Tablet', 200, 8.99, 5),
(6, 'Equipment for laboratory use', 30.0, '/lab-equipment.png', 150.00, 'Microscope', 10, 140.00, 6),
(7, 'Multivitamins for overall health', 12.0, '/multivitamin.png', 29.99, 'Daily Multivitamin', 90, 27.99, 7),
(8, 'Emergency medical kit for first aid', 25.0, '/first-aid-kit.png', 49.99, 'First Aid Kit', 30, 44.99, 8);








INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id) VALUES
(9, 'Antibiotic for bacterial infections', 15, '/antibiotic.png', 20.99, 'Antibiotic', 150, 18.99, 1),
(10, 'Pain relief medication for headaches', 10, '/headache-relief.png', 12.99, 'Headache Relief', 200, 11.49, 1),
(11, 'Vitamins to boost immune system', 20, '/immune-vitamins.png', 25.99, 'Immune Booster', 100, 21.99, 1),
(12, 'Cold and flu relief medication', 5, '/cold-flu.png', 14.99, 'Cold & Flu Relief', 180, 13.49, 1),
(13, 'Anti-inflammatory drug for arthritis', 18, '/arthritis-relief.png', 22.99, 'Arthritis Relief', 80, 18.99, 1),
(14, 'Medication for high blood pressure', 10, '/blood-pressure.png', 30.99, 'Blood Pressure Med', 120, 27.99, 1);




INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id) VALUES
(15, 'Syringe for vaccinations', 8, '/vaccination-syringe.png', 10.99, 'Vaccination Syringe', 60, 9.99, 2),
(16, 'Needle for injections', 12, '/injection-needle.png', 5.99, 'Injection Needle', 100, 5.49, 2),
(17, 'Syringe for insulin', 15, '/insulin-syringe.png', 12.99, 'Insulin Syringe', 80, 11.49, 2),
(18, 'Disposable syringes', 7, '/disposable-syringe.png', 8.99, 'Disposable Syringe', 70, 8.49, 2),
(19, 'Syringe for blood collection', 10, '/blood-collection.png', 14.99, 'Blood Collection Syringe', 50, 13.49, 2),
(20, 'Syringe for IV administration', 6, '/iv-syringe.png', 18.99, 'IV Administration Syringe', 40, 17.49, 2);


INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id) VALUES
(21, 'Hydrating facial cream', 25, '/facial-cream.png', 35.99, 'Facial Cream', 100, 27.99, 3),
(22, 'Anti-aging serum', 20, '/anti-aging-serum.png', 40.99, 'Anti-Aging Serum', 90, 32.99, 3),
(23, 'Nourishing hair conditioner', 15, '/hair-conditioner.png', 25.99, 'Hair Conditioner', 150, 21.99, 3),
(24, 'Moisturizing body lotion', 10, '/body-lotion.png', 19.99, 'Body Lotion', 200, 17.99, 3),
(25, 'Refreshing face mist', 18, '/face-mist.png', 22.99, 'Face Mist', 130, 19.99, 3),
(26, 'Brightening eye cream', 12, '/eye-cream.png', 28.99, 'Eye Cream', 110, 25.99, 3);



INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id) VALUES
(27, 'Homeopathic remedy for colds', 10, '/homeo-cold.png', 18.99, 'Cold Remedy', 90, 17.49, 4),
(28, 'Homeopathic treatment for allergies', 15, '/homeo-allergy.png', 22.99, 'Allergy Treatment', 70, 19.99, 4),
(29, 'Homeopathic medicine for sleep', 20, '/homeo-sleep.png', 27.99, 'Sleep Medicine', 80, 22.99, 4),
(30, 'Homeopathic cure for stress', 25, '/homeo-stress.png', 32.99, 'Stress Cure', 60, 24.99, 4),
(31, 'Homeopathic remedy for digestion', 5, '/homeo-digestion.png', 15.99, 'Digestion Remedy', 100, 14.49, 4),
(32, 'Homeopathic treatment for skin issues', 12, '/homeo-skin.png', 19.99, 'Skin Treatment', 85, 17.99, 4);


INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id) VALUES
(33, 'Pain relief patches', 10, '/pain-patch.png', 12.99, 'Pain Relief Patch', 150, 11.49, 5),
(34, 'Muscle relaxant gel', 15, '/muscle-gel.png', 18.99, 'Muscle Gel', 120, 16.99, 5),
(35, 'Pain relief cream', 20, '/pain-cream.png', 24.99, 'Pain Relief Cream', 80, 19.99, 5),
(36, 'Anti-inflammatory tablets', 8, '/anti-inflammatory.png', 14.99, 'Anti-Inflammatory Tabs', 100, 13.49, 5),
(37, 'Back pain relief spray', 12, '/back-pain-spray.png', 19.99, 'Back Pain Spray', 90, 17.99, 5),
(38, 'Pain relief ointment', 18, '/pain-ointment.png', 22.99, 'Pain Ointment', 110, 20.49, 5);


INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id) VALUES
(39, 'Digital thermometer', 10, '/thermometer.png', 12.99, 'Thermometer', 100, 11.49, 6),
(40, 'Blood pressure monitor', 15, '/bp-monitor.png', 29.99, 'BP Monitor', 80, 25.49, 6),
(41, 'Pulse oximeter', 12, '/pulse-oximeter.png', 18.99, 'Pulse Oximeter', 60, 16.99, 6),
(42, 'Medical stethoscope', 20, '/stethoscope.png', 45.99, 'Stethoscope', 50, 37.99, 6),
(43, 'Glucose meter', 8, '/glucose-meter.png', 22.99, 'Glucose Meter', 70, 20.49, 6),
(44, 'Nebulizer', 25, '/nebulizer.png', 59.99, 'Nebulizer', 40, 50.99, 6);


INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id) VALUES
(45, 'Multivitamins for adults', 15, '/adult-multivitamins.png', 30.99, 'Adult Multivitamins', 90, 26.99, 7),
(46, 'Vitamin C tablets', 10, '/vitamin-c.png', 19.99, 'Vitamin C', 100, 17.99, 7),
(47, 'Vitamin D capsules', 20, '/vitamin-d.png', 22.99, 'Vitamin D', 80, 18.49, 7),
(48, 'Omega-3 supplements', 25, '/omega3.png', 25.99, 'Omega-3', 70, 19.99, 7),
(49, 'Multivitamins for kids', 12, '/kids-multivitamins.png', 18.99, 'Kids Multivitamins', 120, 16.49, 7),
(50, 'Vitamin B complex', 18, '/vitamin-b.png', 27.99, 'Vitamin B Complex', 85, 23.99, 7);


INSERT INTO products (product_id, description, discount, image, price, product_name, quantity, special_price, category_id) VALUES
(51, 'First aid bandage roll', 15, '/bandage-roll.png', 8.99, 'Bandage Roll', 200, 7.99, 8),
(52, 'Antiseptic wipes', 10, '/antiseptic-wipes.png', 5.99, 'Antiseptic Wipes', 150, 5.49, 8),
(53, 'Medical adhesive tape', 12, '/adhesive-tape.png', 4.99, 'Adhesive Tape', 180, 4.49, 8),
(54, 'Instant cold packs', 20, '/cold-packs.png', 6.99, 'Cold Packs', 120, 5.49, 8),
(55, 'Burn ointment', 18, '/burn-ointment.png', 9.99, 'Burn Ointment', 140, 8.49, 8),
(56, 'First aid scissors', 25, '/first-aid-scissors.png', 12.99, 'First Aid Scissors', 90, 9.99, 8);
