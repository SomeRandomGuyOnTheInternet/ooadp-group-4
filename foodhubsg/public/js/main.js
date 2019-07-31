$(document).ready(function () {
	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

$(".select option").val(function (idx, val) {
    $(this).siblings('[value="' + val + '"]').remove();
});

$(".name-input").focusout(function () {
    $(this).val(
        toTitleCase($(this).val())
    );
});

$('#venUpload').on('change', function () {
    let image = $("#venUpload")[0].files[0];
    let formdata = new FormData();
    formdata.append('venImage', image);
    $.ajax({
        url: '/upload',
        type: 'POST',
        data: formdata,
        contentType: false,
        processData: false,
        'success': (data) => {
            $('#venImage').attr('src', data.file);
            $('#imageURL').attr('value', data.file);// sets posterURL hidden field
            if (data.err) {
                $('#posterErr').show();
                $('#posterErr').text(data.err.message);
            } else {
                $('#posterErr').hide();
            }
        }
    });
});

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

function createShopTemplate(shops, actionLink = '/user/shops/') {
	$("#all-shops-container").empty();
	
    if (shops.length > 0) {
        for (i = 0; i < shops.length; i++) {
            $('#all-shops-container').append(
                '<div class="col-md-6 recommended-shops"><div class="blog-entry"><div class="blog-img">' +
                '<a class="action" href="' + actionLink + shops[i].id + '"><img src="' + shops[i].imageLocation + '" class="img-responsive" alt="Image of shop"></a>' +
                '</div><div class="desc all-shops">' +
                '<b class="vendors"><b>' + shops[i].name + '</b></b><br>' +
                '<span class="food_location"><b>' + shops[i].address + '</b></span><br>' +
                '<span class="food_rating">Rating:' + generateRatingIcons(shops[i]) + '</span>' +
                '</div></div></div>'
            );  
        }
    } else {
        $('#all-shops-container').append('<div class="col-md-12"><h3 id="current_location"><b class="center_subtitle">There are no shops that match that criteria</b></h4></div>');
    }

};

function generateRatingIcons(shop) {
    var ratingHTMLstring = "&nbsp;No rating available";

    if (shop.rating) {
        ratingHTMLstring = '<b class="recommended-' + shop.isRecommended + '">';
        for (j = 0; j < shop.rating; j++)  ratingHTMLstring += '&nbsp;<i class="fas fa-star"></i>';
        for (n = 0; n < (5 - shop.rating); n++)  ratingHTMLstring += '&nbsp;<i class="far fa-star"></i>';
        ratingHTMLstring += '</b>'
    }

    return ratingHTMLstring;
};

function generateFoodLogChart(foodLog, userInfo) {
    var foodHistoryChart = document.getElementById('foodHistoryChart' + userInfo.id);
    var foodItems = foodLog;
	var averageCalories = userInfo.averageCalories;
;
	var labels = [], data = [], dailyData = [], breakfastData = [], lunchData = [], dinnerData = [], snacksData = [];
	var red = '#E82020', green = '#4CAF50', grey = '#333333';

	for (var [key, value] of Object.entries(foodItems)) {
		labels.push(key);
		data.push(parseInt(foodItems[key].dailyCalories));
		dailyData.push(parseInt(foodItems[key].dailyCalories));
		breakfastData.push(parseInt(foodItems[key].breakfastCalories));
		lunchData.push(parseInt(foodItems[key].lunchCalories));
		dinnerData.push(parseInt(foodItems[key].dinnerCalories));
		snacksData.push(parseInt(foodItems[key].snacksCalories));
	}

	var myFoodHistoryChart = new Chart(foodHistoryChart, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				data: data,
				label: 'Calories (kcal)',
				backgroundColor: [
					'rgba(255, 99, 132, 0)',
				],
				borderColor: [
					'#bababa',
				],
				borderWidth: 2,
				fill: false,
			}]
		},
		options: {
			responsive: true,
			title: { display: false },
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Calories (kcal)'
					},
					ticks: {
						beginAtZero: true
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Dates'
					}
				}],
			},
			annotation: {
				annotations: [{
					id: 'ideal-calories-line',
					type: 'line',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: 1500,
					borderColor: green,
					borderWidth: 1,
					label: {
						enabled: true,
						content: 'Ideal Calorie Intake',
						backgroundColor: 'white',
						fontColor: green,
					}
				}, {
					id: 'average-calories-line',
					type: 'line',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: averageCalories,
					borderColor: red,
					borderWidth: 1,
					label: {
						enabled: true,
						content: 'Average Calorie Intake',
						backgroundColor: 'white',
						fontColor: red,
					}
				}]
			},
		},
		plugins: [{
			beforeDraw: function (c) {
				let data = c.data.datasets;

				for (var i = 0; i < data.length; i++) {
					for (var key in data._meta) {
						let line = data._meta[key].data[i]._model;
						if (data[i] < c.annotation.elements['ideal-calories-line'].options.value) {
							line.backgroundColor = green;
							line.borderColor = green;
						} else {
							line.backgroundColor = red;
							line.borderColor = red;
						}
					}
				}
			}
		}],
	});

	$('.selectCalorieFilter').change(function () {
		var sel = $(this).val();
		var foodHistoryData = myFoodHistoryChart.config.data.datasets[0].data;
		var idealCaloriesValue = 0, averageCaloriesValue = 0;
		var newData = [];

		switch (sel) {
			case 'Daily':
				newData = dailyData;
				idealCaloriesValue = 1500;
                averageCaloriesValue = userInfo.averageCalories;
				break;
			case 'Breakfast':
				newData = breakfastData;
				idealCaloriesValue = 500;
                averageCaloriesValue = userInfo.averageBreakfastCalories;
				break;
			case 'Lunch':
				newData = lunchData;
				idealCaloriesValue = 400;
                averageCaloriesValue = userInfo.averageLunchCalories;
				break;
			case 'Dinner':
				newData = dinnerData;
				idealCaloriesValue = 450;
                averageCaloriesValue = userInfo.averageDinnerCalories;
				break;
			case 'Snacks':
				newData = snacksData;
				idealCaloriesValue = 150;
                averageCaloriesValue = userInfo.averageSnacksCalories;
				break;
			default:
				newData = dailyData;
				idealCaloriesValue = 1500;
                averageCaloriesValue = userInfo.averageCalories;
				break;
		}

		foodHistoryData.length = 0;
		foodHistoryData.push.apply(
			foodHistoryData, newData
		);

		myFoodHistoryChart.annotation.elements['ideal-calories-line'].options.value = idealCaloriesValue;
		myFoodHistoryChart.annotation.elements['average-calories-line'].options.value = averageCaloriesValue;

		myFoodHistoryChart.update();
	});
};