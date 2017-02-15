package com.ims.test;

import static com.ims.logic.InventoryLogic.viewAllInventory;
import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/beans.xml"})
public class InventoryLogicTest {
	
	
	@Test
	public void testViewAllInventory(){
		String stringExp = "[Inventory [id=101, retailer=Retailer [id=5, name=Cedric Burns, address=[street=Ap #880-7809 Ut Rd., city=Lakewood, state=CO, zip=35710]], product=Product [id=300, name=Test, supplierPrice=5, retailerPrice=55, categories=[]], productQuantity=250, productThreshold=350], Inventory [id=102, retailer=Retailer [id=5, name=Cedric Burns, address=[street=Ap #880-7809 Ut Rd., city=Lakewood, state=CO, zip=35710]], product=Product [id=300, name=Test, supplierPrice=5, retailerPrice=55, categories=[]], productQuantity=350, productThreshold=400], Inventory [id=103, retailer=Retailer [id=5, name=Cedric Burns, address=[street=Ap #880-7809 Ut Rd., city=Lakewood, state=CO, zip=35710]], product=Product [id=100, name=Dog Carrier, supplierPrice=40, retailerPrice=50, categories=[Category [id=100, name=Pet Supplies]]], productQuantity=150, productThreshold=150]]";
		String stringAct = viewAllInventory(5).toString();
		assertEquals("Inventory ID 5", stringExp, stringAct);
	}
	
	

}
