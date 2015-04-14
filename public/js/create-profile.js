$(document).ready(function () {
	// helper function to change the text of attributes
	function changeAtt(att1, att2, att3) {
		$("#att1").html(att1);
		$("#att2").html(att2);
		$("#att3").html(att3);
	}

	// make attributes correspond to stakeholder position type
	$("#stakeholder").change(function() {
		var position = $(this).val();
		if (position == "students") {
			changeAtt("Experience", "Program/Group", "Site");
		}
		else if (position == "faculty") {
			changeAtt("Department", "Courses Taught", "Research Interests");
		}
		else if (position == "community-members") {
			changeAtt("Work Experience", "Support Interests", "Group/Netter Involvement");
		}
		else if (position == "netter-staff") {
			changeAtt("Position/Role", "Projects/Specific Involvements", "Site");
		}
		else if (position == "alumni-patrons") {
			changeAtt("Work Experience", "Support Interests", "Projects/Specific Involvement w/ Netter");
		}
	});
	
});